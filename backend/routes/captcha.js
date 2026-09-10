// backend/routes/captcha.js
const express = require('express');
const { generateCaptcha } = require('../utils/captcha');

const router = express.Router();

/**
 * GET /api/captcha - Issue a new math captcha challenge (public)
 */
router.get('/', (req, res) => {
  const { question, token } = generateCaptcha();
  res.json({ success: true, question, token });
});

module.exports = router;
