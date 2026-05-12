const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

const {
  createTemplate,
  getTemplates,
  getTemplate,
  updateTemplate,
  deleteTemplate,
} = require("../controllers/templateController");

router.post("/", protect, createTemplate);
router.get("/", protect, getTemplates);
router.get("/:id", protect, getTemplate);
router.put("/:id", protect, updateTemplate);
router.delete("/:id", protect, deleteTemplate);

module.exports = router;