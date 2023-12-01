/**
 * @returns { boolean } - whether the user is logged in
 */
export default function isLoggedIn() {
  const cookiesString = document.cookie;
  const cookies = cookiesString.split(';').map((cookieString) => cookieString.trim().split('='));
  const isManagerCookie = cookies.find((cookie) => cookie[0] === 'isManager')?.at(1);
  return isManagerCookie !== undefined;
}
