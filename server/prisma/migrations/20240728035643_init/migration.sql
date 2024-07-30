-- CreateTable
CREATE TABLE "video" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(600) NOT NULL,
    "mimetype" VARCHAR(600) NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "video_pkey" PRIMARY KEY ("id")
);
