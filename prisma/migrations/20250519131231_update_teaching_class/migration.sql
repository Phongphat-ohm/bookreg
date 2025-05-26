/*
  Warnings:

  - You are about to drop the `SubjectAssignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeachingClass` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubjectAssignment" DROP CONSTRAINT "SubjectAssignment_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "SubjectAssignment" DROP CONSTRAINT "SubjectAssignment_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "TeachingClass" DROP CONSTRAINT "TeachingClass_class_id_fkey";

-- DropForeignKey
ALTER TABLE "TeachingClass" DROP CONSTRAINT "TeachingClass_teacher_id_fkey";

-- DropTable
DROP TABLE "SubjectAssignment";

-- DropTable
DROP TABLE "TeachingClass";

-- CreateTable
CREATE TABLE "TeachingAssignment" (
    "id" SERIAL NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "class_id" INTEGER NOT NULL,

    CONSTRAINT "TeachingAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeachingAssignment_subject_id_class_id_key" ON "TeachingAssignment"("subject_id", "class_id");

-- AddForeignKey
ALTER TABLE "TeachingAssignment" ADD CONSTRAINT "TeachingAssignment_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachingAssignment" ADD CONSTRAINT "TeachingAssignment_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachingAssignment" ADD CONSTRAINT "TeachingAssignment_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
