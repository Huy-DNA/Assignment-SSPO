/**
 * @param { number } pageNo - The number of pages
 * @returns { number } time in seconds
 */
export default function estimatePrintTime(pageNo) {
  return pageNo * 5;
}
