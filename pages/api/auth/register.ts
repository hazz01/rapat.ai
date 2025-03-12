import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

    const { name, email, password } = req.body;

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: await bcrypt.hash(password, 10),
            },
        });

        return res.status(201).json(user);

    } catch (error) {
        return res.status(400).json({ error: 'Error creating user' });
    }
}