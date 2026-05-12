const prisma = require("../config/db");

// CREATE TEMPLATE
exports.createTemplate = async (req, res) => {
  try {
    const { name, subject, html } = req.body;

    const template = await prisma.emailTemplate.create({
      data: {
        name,
        subject,
        html,
      },
    });

    res.status(201).json({
      success: true,
      message: "Template created successfully",
      template,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to create template",
    });
  }
};

// GET ALL TEMPLATES
exports.getTemplates = async (req, res) => {
  try {
    const templates = await prisma.emailTemplate.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      templates,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch templates",
    });
  }
};

// GET SINGLE TEMPLATE
exports.getTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await prisma.emailTemplate.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }

    res.status(200).json({
      success: true,
      template,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch template",
    });
  }
};

// UPDATE TEMPLATE
exports.updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTemplate = await prisma.emailTemplate.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });

    res.status(200).json({
      success: true,
      message: "Template updated successfully",
      template: updatedTemplate,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to update template",
    });
  }
};

// DELETE TEMPLATE
exports.deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.emailTemplate.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      success: true,
      message: "Template deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete template",
    });
  }
};