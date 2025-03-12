import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });
  
    const { meetingId, text } = req.body;
  
    try {
      const transcription = await prisma.transcription.create({
        data: {
          meetingId,
          text,
        },
      });
  
      res.status(201).json(transcription);
    } catch (error) {
      console.error("Failed to create transcription:", error);
      res.status(400).json({ message: "Failed to create transcription" });
    }
  }