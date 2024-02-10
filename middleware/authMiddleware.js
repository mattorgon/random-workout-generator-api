// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  console.log("req", req.headers["authorization"]);

  console.log("ttttoken: ", token);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }

  jwt.verify(
    token,
    "bdde87a7703e44e0e2c8a1b20053838f185f4f91d30fd12b82138786fa125fbc",
    (err, user) => {
      if (err) {
        console.log("token: ", token);
        return res.status(403).json({ error: "Forbidden: Invalid token" });
      }
      req.user = user;
      next();
    }
  );
}

module.exports = { authenticateToken };
