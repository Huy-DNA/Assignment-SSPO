import { PrinterJobStatus, PrismaClient } from '@prisma/client';
import { EventEmitter } from 'node:events';

const client = new PrismaClient();

class PrinterManager {
  constructor() {
    this.pendingJobs = new Map();
    this.awakePrinters = new Set();
    this.jobEventEmitter = new EventEmitter();
    this.jobEventEmitter.on('alert', (printerId) => this.alertPrinter(printerId));
    this.init();
  }

  async init() {
    const pendingJobs = await client.printerJob.findMany({
      where: {
        status: {
          not: PrinterJobStatus.Done,
        },
      },
    });

    for (const job of pendingJobs) {
      const { printerId } = job;
      if (!this.pendingJobs.has(printerId)) {
        this.pendingJobs.set(printerId, []);
      }
      const jobs = this.pendingJobs.get(printerId);
      jobs.push(job);
      this.jobEventEmitter.emit('alert', printerId);
    }
  }

  async alertPrinter(printerId) {
    if (this.awakePrinters.has(printerId)) {
      return;
    }
    this.awakePrinters.add(printerId);
    this.processJobs(printerId);
  }

  /* eslint-disable no-await-in-loop */
  async processJobs(printerId) {
    const jobs = this.pendingJobs.get(printerId) || [];
    while (jobs.length > 0) {
      const job = jobs.pop();
      const { id, estimatedTime } = job;

      try {
        await client.printerJob.update({
          data: {
            status: PrinterJobStatus.Printing,
          },
          where: {
            id,
          },
        });

        // eslint-disable-next-line no-promise-executor-return
        await new Promise((resolve) => setTimeout(resolve, estimatedTime * 1000));

        await client.printerJob.update({
          data: {
            status: PrinterJobStatus.Done,
          },
          where: {
            id,
          },
        });
      } catch {
        await client.printerJob.update({
          data: {
            status: PrinterJobStatus.Aborted,
          },
          where: {
            id,
          },
        });
      }
    }
    this.awakePrinters.delete(printerId);
  }
  /* eslint-enable no-await-in-loop */

  pushJob(job) {
    const { printerId } = job;
    if (!this.pendingJobs.has(printerId)) {
      this.pendingJobs.set(printerId, []);
    }
    const jobs = this.pendingJobs.get(printerId);
    jobs.push(job);
    this.jobEventEmitter.emit('alert', printerId);
  }
}

const printerManager = new PrinterManager();

export default printerManager;
