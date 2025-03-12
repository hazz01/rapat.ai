import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") return res.status(405).json({ message: "Method not allowed" });

  const { id } = req.body;

  try {
    await prisma.subscription.delete({
      where: { id },
    });

    res.status(200).json({ message: "Subscription deleted successfully" });
  } catch (error) {
    console.error("Failed to delete subscription:", error);
    res.status(400).json({ message: "Failed to delete subscription" });
  }
}
