const prisma = require("../config/db");
const sendMail = require("../services/mailService");

// SEND BULK TEMPLATE EMAIL
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

        // EXPIRY
        const expiresAt = new Date(
          Date.now() + 24 * 60 * 60 * 1000
        );

        // SAVE REQUEST
        await prisma.uploadRequest.create({
          data: {
            clientId: client.id,
            token: token,
            expiresAt: expiresAt,
          },
        });

        // LIVE LINK
        const uploadLink =
          `https://clientflow-app-bolb.onrender.com/upload/${token}`;

        // TEMPLATE HTML
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