const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();

// ======================
// MIDDLEWARES
// ======================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// STATIC UPLOADS
// ======================
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// ======================
// ROUTES IMPORT
// ======================
const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const clientRoutes = require("./routes/clientRoutes");
const emailRoutes = require("./routes/emailRoutes");
const templateRoutes = require("./routes/templateRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const checklistRoutes = require("./routes/checklistRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// ======================
// API ROUTES
// ======================
app.use("/api", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/checklists", checklistRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ======================
// PUBLIC FOLDER
// ======================
app.use(
  express.static(
    path.join(__dirname, "public")
  )
);

// ======================
// ROOT ROUTE
// ======================
app.get("/", (req, res) => {
  res.status(200).send("API Running...");
});

// ======================
// CLIENT UPLOAD PAGE
// ======================
app.get("/upload/:token", (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      "public",
      "upload.html"
    )
  );

});

// ======================
// 404 HANDLER
// ======================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ======================
// GLOBAL ERROR HANDLER
// ======================
app.use((err, req, res, next) => {

  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });

});

// ======================
// SERVER START
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});