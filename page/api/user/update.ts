import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') return res.status(405).json({ message: 'Method not allowed' });

    const { id, name, email, passwordHash, subscriptionType } = req.body;
    
    try {

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { name, email, passwordHash, subscriptionType },
        });

        return res.status(200).json(updatedUser);

    } catch (error) {
        return res.status(400).json({ error: 'Error updating user' });
    }
}