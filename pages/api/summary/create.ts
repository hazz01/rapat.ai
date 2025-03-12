import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });
  
    const { meetingId, summaryText } = req.body;
  
    try {
      const summary = await prisma.summary.create({
        data: {
          meetingId,
          summaryText,
        },
      });
  
      res.status(201).json(summary);
    } catch (error) {
      console.error("Failed to create summary:", error);
      res.status(400).json({ message: "Failed to create summary" });
    }
  }