import { setCookieHeader } from '../_lib/cookie.js';

export async function onRequestPost() {
  return new Response(null, {
    status: 204,
    headers: { 'Set-Cookie': setCookieHeader('', 0) },
  });
}
