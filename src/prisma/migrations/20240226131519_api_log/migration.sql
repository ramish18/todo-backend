-- CreateTable
CREATE TABLE "ApiCallCount" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ApiCallCount_pkey" PRIMARY KEY ("id")
);
