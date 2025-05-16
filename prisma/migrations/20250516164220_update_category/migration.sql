/*
  Warnings:

  - You are about to drop the column `descripcion` on the `category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `category` DROP COLUMN `descripcion`,
    ADD COLUMN `description` TEXT NULL;
