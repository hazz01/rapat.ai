import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { generateToken } from "../../../lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    console.log("User found:", user); // Debugging

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    console.log("Password valid:", isPasswordValid); // Debugging

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    console.log("Generating token...");
    const token = generateToken(user.id);
    console.log("Token generated:", token);

    return res.status(200).json({ token });

  } catch (error: any) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
}
