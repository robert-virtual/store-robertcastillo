/*
  Warnings:

  - You are about to drop the column `ImageUrl` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `ImageUrl`,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL;
