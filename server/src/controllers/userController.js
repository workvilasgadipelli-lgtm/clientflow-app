exports.getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Protected route accessed",
      user: req.user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};