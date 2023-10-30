import { Router } from 'express';

const router = Router();

/**
 * Controller for /logout
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
function LogoutController(req, res) {
  res.clearCookie('CASTGC');
  res.clearCookie('SESSION_ID');
  res.clearCookie('name');
  res.clearCookie('isManager');
  res.clearCookie('id');
  res.redirect('/');
}

export default () => {
  router.get('/logout', LogoutController);
};
