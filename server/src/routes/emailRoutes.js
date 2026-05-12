const express = require("express");
const router = express.Router();

const {
  protect,
} = require(
  "../middlewares/authMiddleware"
);

const {

  sendTemplateEmail,
  sendBulkTemplateEmail,
  getEmailHistory,

} = require(
  "../controllers/emailController"
);

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