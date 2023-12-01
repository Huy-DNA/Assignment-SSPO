/**
 * @param { Date } date - input data object
 * @returns { string } - formatted string
 */
export default function formatDate(date) {
  return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}
