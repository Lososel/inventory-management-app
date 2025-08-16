import { z } from 'zod';

const tagSchema = z.string().min(1).max(24);
const tagsSchema = z.array(tagSchema).max(10);

export const CreateInventorySchema = z.object({
  title: z.string().min(1).max(120),
  description: z
    .string()
    .max(2000)
    .optional()
    .nullable()
    .transform(v => v ?? undefined),
  category: z.string().max(60).optional(),
  tags: tagsSchema.optional().default([]),
  isPublic: z.boolean().optional().default(false),
});

export type CreateInventoryDto = z.infer<typeof CreateInventorySchema>;

export const UpdateInventorySchema = z.object({
  title: z.string().min(1).max(120).optional(),
  description: z
    .string()
    .max(2000)
    .optional()
    .nullable()
    .transform(v => v ?? undefined),
  category: z.string().max(60).optional(),
  tags: tagsSchema.optional(),
  isPublic: z.boolean().optional(),
  version: z.number().int().nonnegative(),
});

export type UpdateInventoryDto = z.infer<typeof UpdateInventorySchema>;

export const ListInventoriesSchema = z.object({
  mine: z.coerce.boolean().optional().default(false),
  page: z.coerce.number().int().min(1).optional().default(1),
  pageSize: z.coerce.number().int().min(1).max(50).optional().default(10),
  tag: z.string().optional(),
  q: z.string().optional(),
});
export type ListInventoriesQuery = z.infer<typeof ListInventoriesSchema>;
