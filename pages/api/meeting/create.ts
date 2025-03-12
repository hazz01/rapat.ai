import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });
  
    const { userId, title } = req.body;
  
    try {
      const meeting = await prisma.meeting.create({
        data: {
          userId,
          title,
        },
      });
  
      res.status(201).json(meeting);
    } catch (error) {
      console.error("Failed to create meeting:", error);
      res.status(400).json({ message: "Failed to create meeting" });
    }
  }