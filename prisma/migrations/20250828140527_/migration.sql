/*
  Warnings:

  - You are about to drop the column `subscriptionId` on the `School` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."School" DROP CONSTRAINT "School_subscriptionId_fkey";

-- AlterTable
ALTER TABLE "public"."School" DROP COLUMN "subscriptionId";
