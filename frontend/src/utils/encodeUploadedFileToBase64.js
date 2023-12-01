import { Buffer } from 'buffer';

/**
 * Encode uploaded file to Base64
 * @param { string } file - the file content
 */
export default async function encodeUploadedFileToBase64(file) {
  const reader = file.stream().getReader();
  let complete = new Uint8Array([]);
  let partial;
  // eslint-disable-next-line no-cond-assign, no-await-in-loop
  while ((partial = await reader.read())?.value) {
    complete = Buffer.concat([complete, Buffer.from(partial.value)]);
  }
  return complete.toString('base64');
}
