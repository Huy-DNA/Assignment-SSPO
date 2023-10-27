import axios from 'axios';
import process from 'process';
import { PrismaClient, UserRole } from '@prisma/client';

const client = new PrismaClient();

/**
 * Inspect the userInfo to see if it's already in the database
 * If not, add it to the database
 * @param {{ name: string, isManager: boolean, id: string }} userInfo
 */
async function addIfNewUser(userInfo) {
  const isInDb = (await client.user.findFirst({
    where: {
      id: userInfo.id,
    },
  })) !== null;
  if (!isInDb) {
    await client.user.create({
      data: {
        id: userInfo.id,
        name: userInfo.name,
        role: userInfo.isManager ? UserRole.Manager : UserRole.Student,
      },
    });

    if (userInfo.isManager) {
      await client.manager.create({
        data: {
          id: userInfo.id,
        },
      });
    } else {
      await client.student.create({
        data: {
          id: userInfo.id,
          paperNo: 0,
        },
      });
    }
  }
}

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
      const { name, isManager, id } = userInfo.data;
      addIfNewUser(userInfo.data);
      res.cookie('name', name);
      res.cookie('isManager', isManager);
      res.cookie('id', id);
      res.redirect('/');
    }
  }

  if (!ticket) {
    res.redirect(`http://${process.env.CAS_PATH}?service=http://${process.env.HOSTNAME}:${process.env.PORT}/login/`);
  }
}
