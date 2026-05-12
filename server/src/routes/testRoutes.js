const express = require("express");
const router = express.Router();
const prisma = require("../config/db");

router.get("/test-db", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

module.exports = router;