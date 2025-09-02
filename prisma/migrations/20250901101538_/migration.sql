/*
  Warnings:

  - Added the required column `userType` to the `Guardian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Guardian" ADD COLUMN     "userType" TEXT NOT NULL;
