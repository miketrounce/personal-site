import { COOKIE_NAME, readCookie, verifyToken } from './_lib/cookie.js';
import { INNER_HTML } from './_lib/inner-content.js';

export async function onRequestGet({ request, env }) {
  if (!env.GATE_SECRET) {
    return new Response('gate not configured', { status: 500 });
  }

  const cookie = readCookie(request, COOKIE_NAME);
  const ok = await verifyToken(env.GATE_SECRET, cookie);
  if (!ok) {
    return new Response(null, {
      status: 302,
      headers: { Location: '/' },
    });
  }

  return new Response(INNER_HTML, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'private, no-store',
    },
  });
}
