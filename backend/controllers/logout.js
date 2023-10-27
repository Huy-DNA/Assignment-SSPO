/**
 * Controller for /logout
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export default function LogoutController(req, res) {
  res.clearCookie('CASTGC');
  res.clearCookie('name');
  res.clearCookie('isManager');
  res.clearCookie('id');
  res.redirect('/');
}
