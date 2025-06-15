/*
  Warnings:

  - You are about to drop the column `subject_id` on the `SubjectGroup` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubjectGroup" DROP CONSTRAINT "SubjectGroup_subject_id_fkey";

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "subject_group_id" INTEGER;

-- AlterTable
ALTER TABLE "SubjectGroup" DROP COLUMN "subject_id";

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_subject_group_id_fkey" FOREIGN KEY ("subject_group_id") REFERENCES "SubjectGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
