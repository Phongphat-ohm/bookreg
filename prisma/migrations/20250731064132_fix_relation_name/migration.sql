/*
  Warnings:

  - You are about to drop the column `header_id` on the `SubjectGroup` table. All the data in the column will be lost.
  - You are about to drop the `_Advisors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubjectGroup" DROP CONSTRAINT "SubjectGroup_header_id_fkey";

-- DropForeignKey
ALTER TABLE "_Advisors" DROP CONSTRAINT "_Advisors_A_fkey";

-- DropForeignKey
ALTER TABLE "_Advisors" DROP CONSTRAINT "_Advisors_B_fkey";

-- DropIndex
DROP INDEX "SubjectGroup_id_key";

-- AlterTable
ALTER TABLE "SubjectGroup" DROP COLUMN "header_id";

-- DropTable
DROP TABLE "_Advisors";

-- CreateTable
CREATE TABLE "SubjectGroupMembership" (
    "id" SERIAL NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "subject_group_id" INTEGER NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'member',
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubjectGroupMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClassAdvisors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ClassAdvisors_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubjectGroupMembership_teacher_id_key" ON "SubjectGroupMembership"("teacher_id");

-- CreateIndex
CREATE INDEX "_ClassAdvisors_B_index" ON "_ClassAdvisors"("B");

-- AddForeignKey
ALTER TABLE "SubjectGroupMembership" ADD CONSTRAINT "SubjectGroupMembership_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectGroupMembership" ADD CONSTRAINT "SubjectGroupMembership_subject_group_id_fkey" FOREIGN KEY ("subject_group_id") REFERENCES "SubjectGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassAdvisors" ADD CONSTRAINT "_ClassAdvisors_A_fkey" FOREIGN KEY ("A") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassAdvisors" ADD CONSTRAINT "_ClassAdvisors_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
