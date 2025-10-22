const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer" &&
    req.headers.authorization.split(" ")[1]
  ) {
    try {
      const theTokenInTheHeaders = req.headers.authorization.split(" ")[1];
      const theDataInTheToken = jwt.verify(
        theTokenInTheHeaders,
        process.env.TOKEN_SECRET
      );
      console.log("token in the headers -----", theTokenInTheHeaders);
      console.log("here is the data inside the token----", theDataInTheToken);

      req.payload = theDataInTheToken;

      next();
    } catch (error) {
      console.log(error);
      res.status(403).json({ errorMessage: "Invalid Token" });
    }
  } else {
    res.status(403).json({ errorMessage: "No token found" });
  }
}

module.exports = { isAuthenticated };
