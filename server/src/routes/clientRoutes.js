const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

const {
  addClient,
  getClients,
  getClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");

router.post("/", protect, addClient);
router.get("/", protect, getClients);
router.get("/:id", protect, getClient);
router.put("/:id", protect, updateClient);
router.delete("/:id", protect, deleteClient);

module.exports = router;