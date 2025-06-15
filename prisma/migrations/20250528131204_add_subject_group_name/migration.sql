/*
  Warnings:

  - Added the required column `name` to the `SubjectGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubjectGroup" ADD COLUMN     "name" TEXT NOT NULL;
