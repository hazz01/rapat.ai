import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });
  
    try {
      const transcriptions = await prisma.transcription.findMany({
        include: { meeting: true },
      });
  
      res.status(200).json(transcriptions);
    } catch (error) {
      console.error("Failed to fetch transcriptions:", error);
      res.status(500).json({ message: "Failed to fetch transcriptions" });
    }
}