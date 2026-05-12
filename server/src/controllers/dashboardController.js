const prisma = require("../config/db");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalClients =
      await prisma.client.count();

    const totalTemplates =
      await prisma.emailTemplate.count();

    const totalEmails =
      await prisma.emailLog.count();

    const totalDocuments =
      await prisma.uploadedDocument.count();

    res.status(200).json({
      success: true,

      stats: {
        totalClients,
        totalTemplates,
        totalEmails,
        totalDocuments,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
    });
  }
};