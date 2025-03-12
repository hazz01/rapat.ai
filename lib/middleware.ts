import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "./auth";

export const authenticate = (handler: Function) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized, no token provided" });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    if (typeof decoded !== 'string' && decoded.userId) {
      req.body.userId = decoded.userId;
    } else {
      return res.status(401).json({ error: "Invalid token payload" });
    }
    return handler(req, res);
  };
};
