import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PUT") return res.status(405).json({ message: "Method not allowed" });

    const { id, subscriptionType, startDate, endDate } = req.body;

    try {
        const subscription = await prisma.subscription.update({
            where: { id },
            data: {
                subscriptionType,
                startDate,
                endDate,
            },
        });

        res.status(200).json(subscription);
    } catch (error) {
        console.error("Failed to update subscription:", error);
        res.status(400).json({ message: "Failed to update subscription" });
    }
}