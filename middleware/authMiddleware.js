const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from header

  if (!token) return res.status(403).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // Store the decoded user ID in req.user
    next(); // Proceed to the next middleware (route handler)
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = authMiddleware;
