const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// STATIC UPLOADS FOLDER
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// ROUTES
const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const clientRoutes = require("./routes/clientRoutes");
const emailRoutes = require("./routes/emailRoutes");
const templateRoutes = require("./routes/templateRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const checklistRoutes = require("./routes/checklistRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// API ROUTES
app.use("/api", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/checklists", checklistRoutes);
app.use("/api/dashboard", dashboardRoutes);

// PUBLIC FOLDER
app.use(
  express.static(
    path.join(__dirname, "public")
  )
);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running...");
});

// CLIENT UPLOAD PAGE
app.get("/upload/:token", (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      "public",
      "upload.html"
    )
  );

});

// SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});