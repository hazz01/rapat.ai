import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PUT") return res.status(405).json({ message: "Method not allowed" });
  
    const { id, summaryText } = req.body;
  
    try {
      const summary = await prisma.summary.update({
        where: { id },
        data: { summaryText },
      });
  
      res.status(200).json(summary);
    } catch (error) {
      console.error("Failed to update summary:", error);
      res.status(400).json({ message: "Failed to update summary" });
    }
  }