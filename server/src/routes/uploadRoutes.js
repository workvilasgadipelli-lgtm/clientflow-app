const express = require("express");

const router = express.Router();

const { protect } = require(
  "../middlewares/authMiddleware"
);

const upload = require(
  "../middlewares/uploadMiddleware"
);

const {
  createUploadLink,
  uploadDocument,
  getAllUploads
} = require(
  "../controllers/uploadController"
);

// ADMIN CREATE LINK
router.post(
  "/create-link",
  protect,
  createUploadLink
);

// CLIENT UPLOAD
router.post(
  "/:token",
  upload.single("file"),
  uploadDocument
);

// GET ALL UPLOADS
router.get(
  "/tracking",
  getAllUploads
);
module.exports = router;