/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `ApiCallCount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ApiCallCount_type_key" ON "ApiCallCount"("type");
