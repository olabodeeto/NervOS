/*
  Warnings:

  - You are about to drop the `TheSubscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."SchoolSubscription" DROP CONSTRAINT "SchoolSubscription_subscriptionId_fkey";

-- DropTable
DROP TABLE "public"."TheSubscription";

-- CreateTable
CREATE TABLE "public"."Subscription" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "duration" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_name_key" ON "public"."Subscription"("name");

-- AddForeignKey
ALTER TABLE "public"."SchoolSubscription" ADD CONSTRAINT "SchoolSubscription_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "public"."Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
