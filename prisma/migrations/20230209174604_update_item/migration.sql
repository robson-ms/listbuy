/*
  Warnings:

  - You are about to alter the column `price` on the `items` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `amount` on the `items` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `valueTotal` on the `items` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - Added the required column `inTheCart` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `items` ADD COLUMN `inTheCart` BOOLEAN NOT NULL,
    MODIFY `price` DOUBLE NOT NULL,
    MODIFY `amount` DOUBLE NOT NULL,
    MODIFY `valueTotal` DOUBLE NOT NULL;
