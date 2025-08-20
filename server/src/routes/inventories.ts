import { Router } from 'express';
import { prisma } from '../db/prisma.js';
import { requireAuth } from '../auth/jwt.js';
import {
  CreateInventorySchema,
  UpdateInventorySchema,
  ListInventoriesSchema,
} from '../validation/inventory.js';
import type { Prisma } from '@prisma/client';

const router = Router();

function isOwnerOrAdmin(userId: string, ownerId: string, role: 'USER' | 'ADMIN') {
  return role === 'ADMIN' || userId === ownerId;
}

router.post('/', requireAuth, async (req, res) => {
  const parsed = CreateInventorySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const dto = parsed.data;
  const userId = req.auth!.sub;

  const data: Prisma.InventoryCreateInput = {
    title: dto.title,
    isPublic: dto.isPublic ?? false,
    tags: dto.tags ?? [],
    ...(dto.description !== undefined ? { description: dto.description } : {}),
    ...(dto.category !== undefined ? { category: dto.category } : {}),
    owner: { connect: { id: userId } },
  };

  const inventory = await prisma.inventory.create({
    data,
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      tags: true,
      isPublic: true,
      version: true,
      createdAt: true,
      ownerId: true,
    },
  });

  return res.status(201).json(inventory);
});

router.get('/', async (req, res) => {
  const parsed = ListInventoriesSchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const { mine, page, pageSize, tag, query } = parsed.data;

  if (mine && !req.auth) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const where: Prisma.InventoryWhereInput = mine ? { ownerId: req.auth!.sub } : { isPublic: true };

  if (tag) where.tags = { has: tag };
  if (query) where.title = { contains: query, mode: 'insensitive' };

  const [items, total] = await Promise.all([
    prisma.inventory.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        tags: true,
        isPublic: true,
        version: true,
        createdAt: true,
        ownerId: true,
      },
    }),
    prisma.inventory.count({ where }),
  ]);

  return res.json({
    items,
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params as { id: string };

  const inv = await prisma.inventory.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      tags: true,
      isPublic: true,
      version: true,
      createdAt: true,
      ownerId: true,
    },
  });
  if (!inv) return res.status(404).json({ error: 'Not found' });

  if (!inv.isPublic) {
    const role = (req.auth?.role ?? 'USER') as 'USER' | 'ADMIN';
    const userId = req.auth?.sub ?? '';
    if (!isOwnerOrAdmin(userId, inv.ownerId, role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
  }

  return res.json(inv);
});

router.patch('/:id', requireAuth, async (req, res) => {
  const parsed = UpdateInventorySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const dto = parsed.data;
  const { id } = req.params as { id: string };

  const current = await prisma.inventory.findUnique({
    where: { id },
    select: { ownerId: true },
  });
  if (!current) return res.status(404).json({ error: 'Not found' });

  const role = req.auth!.role;
  const userId = req.auth!.sub;
  if (!isOwnerOrAdmin(userId, current.ownerId, role)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const data: Prisma.InventoryUpdateManyMutationInput = {
    ...(dto.title !== undefined ? { title: dto.title } : {}),
    ...(dto.description !== undefined ? { description: dto.description } : {}),
    ...(dto.category !== undefined ? { category: dto.category } : {}),
    ...(dto.tags !== undefined ? { tags: dto.tags } : {}),
    ...(dto.isPublic !== undefined ? { isPublic: dto.isPublic } : {}),
    version: { increment: 1 },
  };

  const { count } = await prisma.inventory.updateMany({
    where: { id, version: dto.version },
    data,
  });

  if (count === 0) {
    return res.status(409).json({ error: 'Version conflict' });
  }

  const updated = await prisma.inventory.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      tags: true,
      isPublic: true,
      version: true,
      createdAt: true,
      ownerId: true,
    },
  });

  return res.json(updated);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params as { id: string };

  const inventory = await prisma.inventory.findUnique({
    where: { id },
    select: { ownerId: true },
  });
  if (!inventory) return res.status(404).json({ error: 'Not found' });

  const role = req.auth!.role;
  const userId = req.auth!.sub;
  if (!isOwnerOrAdmin(userId, inventory.ownerId, role)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  await prisma.inventory.delete({ where: { id } });
  return res.status(204).send();
});

export default router;
