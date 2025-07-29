-- DropForeignKey
ALTER TABLE "BookRegistration" DROP CONSTRAINT "BookRegistration_book_id_fkey";

-- AddForeignKey
ALTER TABLE "BookRegistration" ADD CONSTRAINT "BookRegistration_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
