const prisma = require("../config/db");

// ADD CLIENT
exports.addClient = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      pan,
      dob,
    } = req.body;

    const existingClient = await prisma.client.findUnique({
      where: { email },
    });

    if (existingClient) {
      return res.status(400).json({
        success: false,
        message: "Client already exists",
      });
    }

    const client = await prisma.client.create({
      data: {
        name,
        email,
        mobile,
        pan,
        dob: dob ? new Date(dob) : null,
      },
    });

    res.status(201).json({
      success: true,
      message: "Client added successfully",
      client,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to add client",
    });
  }
};

// GET ALL CLIENTS
exports.getClients = async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      clients,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch clients",
    });
  }
};

// GET SINGLE CLIENT
exports.getClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await prisma.client.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    res.status(200).json({
      success: true,
      client,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch client",
    });
  }
};

// UPDATE CLIENT
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedClient = await prisma.client.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });

    res.status(200).json({
      success: true,
      message: "Client updated successfully",
      client: updatedClient,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to update client",
    });
  }
};

// DELETE CLIENT
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.client.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      success: true,
      message: "Client deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete client",
    });
  }
};