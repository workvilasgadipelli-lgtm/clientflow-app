const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    // check token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    // remove Bearer
    token = token.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};