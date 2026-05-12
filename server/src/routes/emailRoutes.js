const express = require("express");

const router = express.Router();

const {
  sendTemplateEmail,
  sendBulkTemplateEmail,
  getEmailHistory,
} = require("../controllers/emailController");

const {
  protect,
} = require("../middlewares/authMiddleware");

// SEND SINGLE EMAIL
router.post(
  "/send-template",
  protect,
  sendTemplateEmail
);

// SEND BULK EMAIL
router.post(
  "/send-bulk",
  protect,
  sendBulkTemplateEmail
);

// EMAIL HISTORY
router.get(
  "/history",
  protect,
  getEmailHistory
);

module.exports = router;