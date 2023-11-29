/**
 * @param { Date } date
 * @returns { string }
 */
export default function formatDate(date) {
  return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}
