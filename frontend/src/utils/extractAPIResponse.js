/**
 *
 * @param res
 */
export default function extractAPIResponse(res) {
  if (res.success) {
    return res.value;
  }
  throw res.error;
}
