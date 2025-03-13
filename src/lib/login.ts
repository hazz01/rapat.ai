import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SECRET_KEY = process.env.JWT_SECRET || "secretkey";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: "Email tidak ditemukan" });

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) return res.status(401).json({ message: "Password salah" });

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1d" });

    res.status(200).json({
      message: "Login berhasil!",
      token,
      userId: user.id,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
