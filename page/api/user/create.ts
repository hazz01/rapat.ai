import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

    const { name, email, passwordHash, subscriptionType} = req.body;

    try {
        const newUser = await prisma.user.create({
            data: { name, email, passwordHash, subscriptionType },
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: 'User already exists' });
    }
}