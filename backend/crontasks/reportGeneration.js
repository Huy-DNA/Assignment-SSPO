import cron from 'node-cron';
import moment from 'moment';
import generateReport from '../utils/generateReport.js';

/**
 * Schedule a cronjob for generating reports
 */
export default function scheduleReportGeneration() {
  cron.schedule('10 0 * * 1', () => {
    console.log('Generate weekly report.........');
    const yesterday = moment().subtract(1, 'days');
    generateReport(yesterday.year(), yesterday.week());
  });

  cron.schedule('10 0 1 1 *', () => {
    console.log('Generate yearly report.........');
    const yesterday = moment().subtract(1, 'days');
    generateReport(yesterday.year(), undefined);
  });
}
