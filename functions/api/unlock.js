import { COOKIE_MAX_AGE, setCookieHeader, signToken } from '../_lib/cookie.js';

const HUBSPOT_PORTAL_ID = '5848423';
const HUBSPOT_FORM_GUID = '79391f64-6994-4465-82bd-bbb1910dfda9';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequestPost({ request, env }) {
  if (!env.GATE_SECRET) {
    return new Response(JSON.stringify({ error: 'gate not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'bad json' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  if (!EMAIL_RE.test(email)) {
    return new Response(JSON.stringify({ error: 'invalid email' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields: [{ name: 'email', value: email }] }),
      },
    );
    if (!res.ok) throw new Error(`hubspot ${res.status}`);
  } catch {
    return new Response(JSON.stringify({ error: 'submit failed' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const expSec = Math.floor(Date.now() / 1000) + COOKIE_MAX_AGE;
  const token = await signToken(env.GATE_SECRET, expSec);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': setCookieHeader(token, COOKIE_MAX_AGE),
    },
  });
}
