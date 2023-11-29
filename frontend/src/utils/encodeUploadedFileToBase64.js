import { Buffer } from 'buffer';

/**
 *
 * @param file
 */
export default async function encodeUploadedFileToBase64(file) {
  const reader = file.stream().getReader();
  let complete = new Uint8Array([]);
  let partial;
  while ((partial = await reader.read())?.value) {
    complete = Buffer.concat([complete, Buffer.from(partial.value)]);
  }
  return complete.toString('base64');
}
