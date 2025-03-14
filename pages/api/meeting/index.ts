import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const meetings = await prisma.meeting.findMany({
            where: { userId: parseInt(userId as string, 10) },
            include: { user: true },
        });

        res.status(200).json(meetings);
    } catch (error) {
        console.error("Failed to fetch meetings:", error);
        res.status(500).json({ message: "Failed to fetch meetings" });
    }
}