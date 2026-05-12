const prisma = require("../config/db");
const crypto = require("crypto");

// CREATE UPLOAD LINK
exports.createUploadLink = async (
  req,
  res
) => {

  try {

    const { clientId } = req.body;

    const client =
      await prisma.client.findUnique({

        where: {
          id: Number(clientId),
        },

      });

    // CLIENT NOT FOUND
    if (!client) {

      return res.status(404).json({

        success: false,
        message: "Client not found",

      });

    }

    // GENERATE TOKEN
    const token =
      crypto.randomBytes(32).toString("hex");

    // LINK EXPIRY
    const expiresAt = new Date(
      Date.now() +
      24 * 60 * 60 * 1000
    );

    // SAVE REQUEST
    const uploadRequest =
      await prisma.uploadRequest.create({

        data: {
          clientId: client.id,
          token,
          expiresAt,
        },

      });

    // LIVE UPLOAD LINK
    const uploadLink =
      `https://postal-these-customs.ngrok-free.dev/upload/${token}`;

    res.status(200).json({

      success: true,
      uploadLink,
      uploadRequest,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,
      message:
        "Failed to create upload link",

    });

  }

};

// UPLOAD DOCUMENT
exports.uploadDocument = async (
  req,
  res
) => {

  try {

    const { token } = req.params;

    const uploadRequest =
      await prisma.uploadRequest.findUnique({

        where: {
          token,
        },

      });

    // INVALID TOKEN
    if (!uploadRequest) {

      return res.status(404).json({

        success: false,
        message:
          "Invalid upload link",

      });

    }

    // EXPIRED LINK
    if (
      new Date() >
      uploadRequest.expiresAt
    ) {

      return res.status(400).json({

        success: false,
        message:
          "Upload link expired",

      });

    }

    // FILE NOT FOUND
    if (!req.file) {

      return res.status(400).json({

        success: false,
        message:
          "No file uploaded",

      });

    }

    // SAVE DOCUMENT
    const document =
      await prisma.uploadedDocument.create({

        data: {

          clientId:
            uploadRequest.clientId,

          // SAVE REAL FILE NAME
          fileName:
            req.file.filename,

          // SAVE FILE PATH
          filePath:
            req.file.path,

        },

      });

    res.status(200).json({

      success: true,
      message:
        "File uploaded successfully",

      document,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,
      message:
        "Upload failed",

    });

  }

};

// GET ALL UPLOADS
exports.getAllUploads = async (
  req,
  res
) => {

  try {

    const uploads =
      await prisma.uploadedDocument.findMany({

        include: {
          client: true,
        },

        orderBy: {
          id: "desc",
        },

      });

    res.status(200).json({

      success: true,
      uploads,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,
      message:
        "Failed to fetch uploads",

    });

  }

};