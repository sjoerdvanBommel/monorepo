/*
  Warnings:

  - A unique constraint covering the columns `[id,order]` on the table `CourseSection` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quiz_id_fkey";

-- AlterTable
ALTER TABLE "CourseSection" ADD COLUMN     "order" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "quiz_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CourseSection_id_order_key" ON "CourseSection"("id", "order");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE SET NULL ON UPDATE CASCADE;
