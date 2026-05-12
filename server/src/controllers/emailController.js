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
        const uploadLink =
          `https://clientflow-app-bolb.onrender.com/upload/${token}`;

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