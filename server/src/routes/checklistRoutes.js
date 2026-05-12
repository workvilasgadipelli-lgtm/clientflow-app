const express = require("express");

const router = express.Router();

const { protect } =
  require("../middlewares/authMiddleware");

const {
  createChecklist,
  getChecklists,
} = require("../controllers/checklistController");

router.post("/", protect, createChecklist);

router.get("/", protect, getChecklists);

module.exports = router;