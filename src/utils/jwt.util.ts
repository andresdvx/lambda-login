import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecret";

export function generateToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "2h" });
}
