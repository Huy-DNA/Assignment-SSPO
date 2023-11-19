import axios from 'axios';
import { Router } from 'express';
import process from 'process';
import addIfNewUser from '../utils/addIfNewUser.js';
import getSessionId from '../utils/getSessionId.js';
import getUserFromSession from '../utils/getUserFromSession.js';

const router = Router();

/**
 * Controller for /login
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function LoginController(req, res) {
  const { ticket } = req.query;

  if (ticket) {
    const userInfo = (await axios.get(`http://${process.env.CAS_PATH}?service=http://${process.env.HOSTNAME}:${process.env.PORT}&ticket=${ticket}`)).data;
    if (!userInfo.success) {
      res.clearCookie('CASTGC');
      res.redirect(`http://${process.env.CAS_PATH}?service=http://${process.env.HOSTNAME}:${process.env.PORT}/login/`);
    } else {
      const { name, isManager, id } = userInfo.data;
      await addIfNewUser(userInfo.data);
      res.cookie('name', name, {
        maxAge: 900000,
      });
      res.cookie('isManager', isManager, {
        maxAge: 900000,
      });
      res.cookie('id', id, {
        maxAge: 900000,
      });
      const sessionId = await getSessionId(id);
      res.cookie('SESSION_ID', sessionId, {
        httpOnly: true,
        maxAge: 900000,
      });
      res.redirect('/');
    }

    return;
  }

  const { SESSION_ID } = req.cookies;
  if (SESSION_ID) {
    const userInfo = await getUserFromSession(SESSION_ID);
    if (userInfo === null) {
      res.clearCookie('SESSION_ID');
      res.redirect(`http://${process.env.CAS_PATH}?service=http://${process.env.HOSTNAME}:${process.env.PORT}/login/`);
    } else {
      const { name, isManager, id } = userInfo;
      res.cookie('name', name);
      res.cookie('isManager', isManager);
      res.cookie('id', id);
      res.redirect('/');
    }
    return;
  }

  res.redirect(`http://${process.env.CAS_PATH}?service=http://${process.env.HOSTNAME}:${process.env.PORT}/login/`);
}

router.get('/login', LoginController);

export default router;
