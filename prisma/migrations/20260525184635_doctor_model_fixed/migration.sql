/*
  Warnings:

  - You are about to drop the column `password` on the `doctors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "password",
ADD COLUMN     "address" VARCHAR(255),
ADD COLUMN     "profilePhoto" VARCHAR(255);
