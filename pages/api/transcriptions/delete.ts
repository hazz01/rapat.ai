import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "DELETE") return res.status(405).json({ message: "Method not allowed" });
  
    const { id } = req.body;
  
    try {
      await prisma.transcription.delete({
        where: { id },
      });
  
      res.status(200).json({ message: "Transcription deleted successfully" });
    } catch (error) {
      console.error("Failed to delete transcription:", error);
      res.status(400).json({ message: "Failed to delete transcription" });
    }
  }