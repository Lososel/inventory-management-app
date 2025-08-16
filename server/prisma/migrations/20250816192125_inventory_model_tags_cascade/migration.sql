-- DropForeignKey
ALTER TABLE "public"."Item" DROP CONSTRAINT "Item_inventoryId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Item" ADD CONSTRAINT "Item_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "public"."Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
