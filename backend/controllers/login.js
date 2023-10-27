import axios from 'axios';
import process from 'process';

/**
 * Controller for /login
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export default async function LoginController(req, res) {
  const { ticket } = req.query;

  let userInfo;
  if (ticket) {
    userInfo = (await axios.get(`http://${process.env.CAS_PATH}?service=http://${process.env.HOSTNAME}:${process.env.PORT}&ticket=${ticket}`)).data;
    if (!userInfo.success) {
      res.clearCookie('CASTGC');
      res.redirect(`http://${process.env.CAS_PATH}?service=http://${process.env.HOSTNAME}:${process.env.PORT}/login/`);
    } else {
      const { username, isManager, id } = userInfo.data;
      res.cookie('name', username);
      res.cookie('isManager', isManager);
      res.cookie('id', id);
      res.redirect('/');
    }
  }

  if (!ticket) {
    res.redirect(`http://${process.env.CAS_PATH}?service=http://${process.env.HOSTNAME}:${process.env.PORT}/login/`);
  }
}
