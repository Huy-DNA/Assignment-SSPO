import { PrismaClient} from '@prisma/client';

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB
// run inside `async` function

/**
 * function lưu thông tin về việc in ấn về database
 * @param {object} data object chứa thông tin về in ấn
 * 
 */
export default async function logPrinterJob (data) {
    //create
      const res = await prisma.printerJob.create({
          data
        });
}