import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PUT") return res.status(405).json({ message: "Method not allowed" });
  
    const { id, text } = req.body;
  
    try {
      const transcription = await prisma.transcription.update({
        where: { id },
        data: { text },
      });
  
      res.status(200).json(transcription);
    } catch (error) {
      console.error("Failed to update transcription:", error);
      res.status(400).json({ message: "Failed to update transcription" });
    }
  }