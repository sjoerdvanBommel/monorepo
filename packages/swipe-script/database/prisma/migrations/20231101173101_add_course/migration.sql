/*
  Warnings:

  - You are about to drop the column `quiz_slug` on the `Question` table. All the data in the column will be lost.
  - The primary key for the `Quiz` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `image_key` on the `Quiz` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug,section_id]` on the table `Quiz` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quiz_id` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `section_id` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quiz_slug_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "quiz_slug",
ADD COLUMN     "quiz_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_pkey",
DROP COLUMN "image_key",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "section_id" INTEGER NOT NULL,
ADD CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image_url" TEXT,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseSection" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "CourseSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CourseSection_slug_course_id_key" ON "CourseSection"("slug", "course_id");

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_slug_section_id_key" ON "Quiz"("slug", "section_id");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "CourseSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSection" ADD CONSTRAINT "CourseSection_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
