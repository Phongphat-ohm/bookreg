-- CreateTable
CREATE TABLE "SubjectGroup" (
    "id" SERIAL NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "header_id" INTEGER NOT NULL,

    CONSTRAINT "SubjectGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubjectGroup_id_key" ON "SubjectGroup"("id");

-- AddForeignKey
ALTER TABLE "SubjectGroup" ADD CONSTRAINT "SubjectGroup_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectGroup" ADD CONSTRAINT "SubjectGroup_header_id_fkey" FOREIGN KEY ("header_id") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
