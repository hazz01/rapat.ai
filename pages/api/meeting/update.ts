import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PUT") return res.status(405).json({ message: "Method not allowed" });
  
    const { id, title } = req.body;
  
    try {
      const meeting = await prisma.meeting.update({
        where: { id },
        data: { title },
      });
  
      res.status(200).json(meeting);
    } catch (error) {
      console.error("Failed to update meeting:", error);
      res.status(400).json({ message: "Failed to update meeting" });
    }
  }