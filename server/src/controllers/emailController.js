const prisma = require("../config/db");
const sendMail = require("../services/mailService");

// SEND TEMPLATE EMAIL
exports.sendTemplateEmail = async (req, res) => {
  try {
    const { clientId, templateId } = req.body;

    // GET CLIENT
    const client = await prisma.client.findUnique({
      where: {
        id: Number(clientId),
      },
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    // CHECK EMAIL ENABLED
    if (!client.emailEnabled) {
      return res.status(400).json({
        success: false,
        message: "Email disabled for this client",
      });
    }

    // GET TEMPLATE
    const template = await prisma.emailTemplate.findUnique({
      where: {
        id: Number(templateId),
      },
    });

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }

    // DYNAMIC VARIABLE REPLACEMENT
    let finalHtml = template.html;

    finalHtml = finalHtml.replace(
      /{{client_name}}/g,
      client.name
    );

    finalHtml = finalHtml.replace(
      /{{client_email}}/g,
      client.email
    );

    finalHtml = finalHtml.replace(
      /{{client_mobile}}/g,
      client.mobile || ""
    );

    // SEND EMAIL
    await sendMail({
      to: client.email,
      subject: template.subject,
      html: finalHtml,
    });

    // SAVE EMAIL LOG
    await prisma.emailLog.create({
      data: {
        clientId: client.id,
        templateId: template.id,
        status: "sent",
      },
    });

    res.status(200).json({
      success: true,
      message: "Template email sent successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to send template email",
    });
  }
};


// BULK TEMPLATE EMAIL
// BULK TEMPLATE EMAIL WITH UPLOAD LINK
exports.sendBulkTemplateEmail = async (req, res) => {
  try {
    const { clientIds, templateId } = req.body;

    // GET TEMPLATE
    const template =
      await prisma.emailTemplate.findUnique({
        where: {
          id: Number(templateId),
        },
      });

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }

    let successCount = 0;
    let failedCount = 0;

    for (const clientId of clientIds) {
      try {
        // GET CLIENT
        const client =
          await prisma.client.findUnique({
            where: {
              id: Number(clientId),
            },
          });

        if (!client) continue;

        if (!client.emailEnabled) continue;

        // GENERATE TOKEN
        const crypto = require("crypto");

        const token = crypto
          .randomBytes(32)
          .toString("hex");

        // CREATE UPLOAD REQUEST
        const expiresAt = new Date(
          Date.now() + 24 * 60 * 60 * 1000
        );

        await prisma.uploadRequest.create({
          data: {
            clientId: client.id,
            token,
            expiresAt,
          },
        });

        // UPLOAD LINK
        const uploadLink = `https://clientflow-app-bolb.onrender.com/upload/${token}`;

        // TEMPLATE VARIABLES
        let finalHtml = template.html;

        finalHtml = finalHtml.replace(
          /{{client_name}}/g,
          client.name
        );

        finalHtml = finalHtml.replace(
          /{{client_email}}/g,
          client.email
        );

        finalHtml = finalHtml.replace(
          /{{upload_link}}/g,
          uploadLink
        );

        // SEND EMAIL
        await sendMail({
          to: client.email,
          subject: template.subject,
          html: finalHtml,
        });

        // SAVE LOG
        await prisma.emailLog.create({
          data: {
            clientId: client.id,
            templateId: template.id,
            status: "sent",
          },
        });

        successCount++;
      } catch (error) {
        console.log(error);

        failedCount++;
      }
    }

    res.status(200).json({
      success: true,
      message: "Bulk email sent successfully",
      successCount,
      failedCount,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Bulk email failed",
    });
  }
}; 
// EMAIL HISTORY
exports.getEmailHistory = async (
  req,
  res
) => {

  try {

    const emails =
      await prisma.emailLog.findMany({

        include: {
          client: true,
        },

        orderBy: {
          id: "desc",
        },

      });

    res.status(200).json({

      success: true,
      emails,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,
      message:
        "Failed to fetch emails",

    });

  }

};