var jwt = require("jsonwebtoken");
const key = "glitch";

const authenticate = (req, res, next) => {
  //get a user from jwt token and id to req object
  const token = req.header("authToken");
  if (!token) {
    return res.status(401).send({
      error: "Unauthorized!!!. Please authenticate your credentials first",
    });
  }
  try {
    const payload = jwt.verify(token, key);
    req.user = payload.user;
    next();
  } catch (error) {
    return res.status(401).send({
      error: "Unauthorized!!!. Please authenticate your credentials first",
    });
  }
};
const authenticateTokenAdmin = (req, res, next) => {
  //get a user from jwt token and id to req object
  const token = req.header("authToken");
  if (!token) {
    return res.status(401).send({
      error: "Unauthorized!!!. Please authenticate your credentials first",
    });
  }
  try {
    const payload = jwt.verify(token, key);
    req.user = payload.user;
    if (req.user !== payload.user || req.user.isAdmin === false) {
      return res.status(401).send({
        error: "Unauthorized!!!. You are not an admin",
      });
    }
    next();
  } catch (error) {
    return res.status(401).send({
      error: "Unauthorized!!!",
    });
  }
};
const authenticateAdmin = (req, res, next) => {
  //get a user from jwt token and id to req object
  const token = req.header("authToken");
  if (!token) {
    return res.status(401).send({
      error: "Unauthorized!!!.You are not an Admin",
    });
  }

  try {
    const payload = jwt.verify(token, key);
    req.user = payload.user;
    if (req.user.isAdmin === false) {
      return res.status(401).send({
        error: "Unauthorized!!!. You are not an admin",
      });
    }
    next();
  } catch (error) {
    return res.status(401).send({
      error: "Unauthorized!!!. Please authenticate your credentials first",
    });
  }
};

module.exports = {
  authenticate,
  authenticateTokenAdmin,
  authenticateAdmin,
};
