import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });
  
    const { userId, subscriptionType, startDate, endDate } = req.body;
  
    try {
      const subscription = await prisma.subscription.create({
        data: {
          userId,
          subscriptionType,
          startDate,
          endDate,
        },
      });
  
      res.status(201).json(subscription);
    } catch (error) {
      console.error("Failed to create subscription:", error);
      res.status(400).json({ message: "Failed to create subscription" });
    }
  }