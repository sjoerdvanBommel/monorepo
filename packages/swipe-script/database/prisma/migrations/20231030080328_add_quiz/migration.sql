/*
  Warnings:

  - You are about to drop the column `difficulty_level` on the `Question` table. All the data in the column will be lost.
  - Added the required column `quiz_slug` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('NO_EXPERIENCE', 'BEGINNER', 'JUNIOR_DEVELOPER', 'MEDIOR_DEVELOPER', 'SENIOR_DEVELOPER', 'TECH_LEAD');

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "difficulty_level",
ADD COLUMN     "quiz_slug" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Quiz" (
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image_key" TEXT,
    "difficulty_levels" "DifficultyLevel"[],

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("slug")
);

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quiz_slug_fkey" FOREIGN KEY ("quiz_slug") REFERENCES "Quiz"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
