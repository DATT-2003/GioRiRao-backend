const jwt = require("jsonwebtoken");
const HttpStatusCodes = require("../config/http.status.config");

const verifyAccessToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED.code)
      .json({ message: "Access token is invalid" });
  }

  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    // err
    if (err.name === "TokenExpiredError") {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED.code)
        .json({ message: "Access token is invalid" });
    } else if (err) {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED.code)
        .json({ message: "Access token is invalid" });
    }
  }
};

module.exports = verifyAccessToken;
