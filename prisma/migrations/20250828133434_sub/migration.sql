/*
  Warnings:

  - You are about to drop the column `endDate` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Subscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `duration` on the `Subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Subscription" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
DROP COLUMN "duration",
ADD COLUMN     "duration" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."SchoolSubscription" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "subscriptionId" TEXT NOT NULL,

    CONSTRAINT "SchoolSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_name_key" ON "public"."Subscription"("name");

-- AddForeignKey
ALTER TABLE "public"."SchoolSubscription" ADD CONSTRAINT "SchoolSubscription_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "public"."School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SchoolSubscription" ADD CONSTRAINT "SchoolSubscription_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "public"."Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
