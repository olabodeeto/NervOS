/*
  Warnings:

  - Made the column `userType` on table `PortalUser` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."PortalUser" ALTER COLUMN "userType" SET NOT NULL;
