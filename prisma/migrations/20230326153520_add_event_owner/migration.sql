/*
  Warnings:

  - Added the required column `ownerId` to the `BurnerEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BurnerEvent" ADD COLUMN     "ownerId" STRING NOT NULL;

-- AddForeignKey
ALTER TABLE "BurnerEvent" ADD CONSTRAINT "BurnerEvent_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
