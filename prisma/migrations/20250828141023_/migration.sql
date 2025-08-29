/*
  Warnings:

  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."SchoolSubscription" DROP CONSTRAINT "SchoolSubscription_subscriptionId_fkey";

-- DropTable
DROP TABLE "public"."Subscription";

-- CreateTable
CREATE TABLE "public"."TheSubscription" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "duration" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "TheSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TheSubscription_name_key" ON "public"."TheSubscription"("name");

-- AddForeignKey
ALTER TABLE "public"."SchoolSubscription" ADD CONSTRAINT "SchoolSubscription_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "public"."TheSubscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
