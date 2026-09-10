// backend/utils/captcha.js
// Stateless, self-hosted math captcha. No DB/session storage needed:
// the expected answer is never sent to the client — only a question and an
// HMAC-signed token binding an expiry to the correct answer. Verifying just
// means recomputing the same HMAC over the submitted answer and comparing.
const crypto = require('crypto');

const SECRET = process.env.JWT_SECRET || 'dev-captcha-secret';
const TTL_MS = 10 * 60 * 1000; // 10 minutes

function sign(payload) {
  return crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
}

function generateCaptcha() {
  const a = Math.floor(Math.random() * 10) + 1; // 1-10
  const b = Math.floor(Math.random() * 10) + 1; // 1-10
  const answer = a + b;
  const exp = Date.now() + TTL_MS;

  const header = Buffer.from(JSON.stringify({ exp })).toString('base64url');
  const signature = sign(`${exp}:${answer}`);
  const token = `${header}.${signature}`;

  return { question: `${a} + ${b}`, token };
}

function verifyCaptcha(token, submittedAnswer) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return false;
  if (submittedAnswer === undefined || submittedAnswer === null || submittedAnswer === '') return false;

  const [header, signature] = token.split('.');
  if (!header || !signature) return false;

  let exp;
  try {
    ({ exp } = JSON.parse(Buffer.from(header, 'base64url').toString('utf8')));
  } catch {
    return false;
  }
  if (typeof exp !== 'number' || Date.now() > exp) return false;

  const expectedSignature = sign(`${exp}:${Number(submittedAnswer)}`);
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSignature);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

module.exports = { generateCaptcha, verifyCaptcha };
