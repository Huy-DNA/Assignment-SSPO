/**
 *
 */
export default function getId() {
  const cookiesString = document.cookie;
  const cookies = cookiesString.split(';').map((cookieString) => cookieString.trim().split('='));
  const idCookie = cookies.find((cookie) => cookie[0] === 'id')?.at(1);
  return idCookie;
}
