import { PrinterJobStatus, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class PrinterManager {
  constructor() {
    this.pendingJobs = new Map();
  }

  async init() {
    const pendingJobs = await prisma.printerJob.findMany({
      where: {
        status: {
          not: PrinterJobStatus.Done,
        },
      },
    });

    for (const job of pendingJobs) {
      if (!this.pendingJobs.has(job.printerId)) {
        this.pendingJobs.set(job.printerId, []);
      }
      this.pendingJobs.get(job.printerId).push(job);
    }
  }

  getNextJob(printerId) {
    const jobs = this.pendingJobs.get(printerId);
    if (!jobs) {
      return undefined;
    }
    return jobs.pop();
  }

  pushJob(job, printerId) {
    if (!this.pendingJobs.has(printerId)) {
      this.pendingJobs.set(printerId, []);
    }
    this.pendingJobs.get(printerId).push(job);
  }
}

const printerManager = new PrinterManager();
await printerManager.init();

export default printerManager;
