import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE  ') return res.status(405).json({ message: 'Method not allowed' });

    const { id } = req.body;

    try {
        const deletedUser = await prisma.user.delete({
            where: { id },
        });

        return res.status(200).json(deletedUser);

    } catch (error) {
        return res.status(400).json({ error: 'Error deleting user' });
    }

}