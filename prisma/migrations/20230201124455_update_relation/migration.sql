/*
  Warnings:

  - You are about to drop the `ListItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `listId` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `items` ADD COLUMN `listId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `ListItem`;

-- CreateIndex
CREATE INDEX `items_listId_idx` ON `items`(`listId`);
