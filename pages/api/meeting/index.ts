import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });
  
    try {
      const meetings = await prisma.meeting.findMany({
        include: { user: true },
      });
  
      res.status(200).json(meetings);
    } catch (error) {
      console.error("Failed to fetch meetings:", error);
      res.status(500).json({ message: "Failed to fetch meetings" });
    }
  }