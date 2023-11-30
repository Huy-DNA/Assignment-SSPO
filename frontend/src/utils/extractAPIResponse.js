/**
 *
 * @param res - extract value or throw errors
 *              from the response object whose format was defined by our API
 */
export default function extractAPIResponse(res) {
  if (res.success) {
    return res.value;
  }
  throw res.error;
}
