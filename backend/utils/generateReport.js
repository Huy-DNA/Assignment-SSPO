import { PrismaClient } from '@prisma/client';
import moment from 'moment';

const client = new PrismaClient();

/**
 * Generate a report on printer jobs and transactions made during `week` of `year`
 * @param { number } year - the year to generate the report
 * @param { number | undefined } week - the week to generate the report
 */
export default async function generateReport(year, week) {
  const firstDate = week !== undefined
    ? moment().day('Monday').year(year).week(week)
      .toDate()
    : moment().year(year).startOf('year').toDate();
  const lastDate = week !== undefined
    ? moment().day('Sunday').year(year).week(week)
      .toDate()
    : moment().year(year).endOf('year').toDate();

  const printerJobs = await client.printerJob.findMany({
    select: {
      id: true,
    },
    where: {
      createdAt: {
        gte: firstDate,
        lte: lastDate,
      },
    },
  });

  const transactions = await client.transaction.findMany({
    select: {
      id: true,
    },
    where: {
      createdAt: {
        gte: firstDate,
        lte: lastDate,
      },
    },
  });

  await client.report.create({
    data: {
      year,
      week,
      printer_jobs: {
        connect: printerJobs,
      },
      transactions: {
        connect: transactions,
      },
    },
  });
}
