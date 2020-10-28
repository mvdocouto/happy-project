import * as express from "express";
const jwt = require("jsonwebtoken");
const { SECRET_TOKEN } = <any>process.env;

const authenticate = async (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  const SECRET = Buffer.from(SECRET_TOKEN).toString("base64");

  const auth = request.headers["authorization"] || "";
  const token = auth.split("Bearer ")[1];

  await jwt.verify(token, SECRET, (err: any, decoded: any) => {
    if (err)
      return response
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });
    next();
  });
};

export default authenticate;
