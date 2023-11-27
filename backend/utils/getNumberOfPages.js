import _ from 'lodash';
import { PdfCounter, DocxCounter } from 'page-count';

/**
 * @param { string } base64Content - the content of the pdf file
 * @returns { Promise<number | undefined> } the number of pages
 */
export async function getNumberOfPdfPages(base64Content) {
  const pdfBuffer = Buffer.from(base64Content, 'base64');

  try {
    return await PdfCounter.count(pdfBuffer);
  } catch (e) {
    return undefined;
  }
}

/**
 * @param { string } base64Content - the content of the docx file
 * @returns { Promise<number | undefined> } the number of pages
 */
export async function getNumberOfDocxPages(base64Content) {
  const docxBuffer = Buffer.from(base64Content, 'base64');

  try {
    return await DocxCounter.count(docxBuffer);
  } catch (e) {
    return undefined;
  }
}

/**
 * @param { string } name - the name of the file
 * @param { content } base64Content - the content of the file encoded in Base64
 * @returns { number | undefined } the number of pages
 */
export default function getNumberOfPages(name, base64Content) {
  const ext = _.last(name.split('.'));
  if (!ext) {
    return undefined;
  }
  switch (ext) {
    case 'pdf':
      return getNumberOfPdfPages(base64Content);
    case 'docx':
      return getNumberOfDocxPages(base64Content);
    case 'png':
    case 'svg':
    case 'jpg':
    case 'jpeg':
      return 1;
    default:
      return undefined;
  }
}
