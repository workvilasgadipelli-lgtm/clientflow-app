const prisma = require("../config/db");

// CREATE CHECKLIST ITEM
exports.createChecklist = async (req, res) => {
  try {
    const { name } = req.body;

    const item =
      await prisma.documentChecklist.create({
        data: {
          name,
        },
      });

    res.status(201).json({
      success: true,
      item,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to create checklist item",
    });
  }
};

// GET ALL CHECKLISTS
exports.getChecklists = async (req, res) => {
  try {
    const items =
      await prisma.documentChecklist.findMany();

    res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch checklist",
    });
  }
};