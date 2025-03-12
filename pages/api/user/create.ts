import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

    const { name, email, password, subscriptionType } = req.body;
    console.log("Request Body:", req.body);


    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }

    try {
        // Hash password sebelum menyimpannya ke database
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await prisma.user.create({
            data: { name, email, passwordHash, subscriptionType },
        });

        res.status(201).json(newUser);
    } catch (error: any) {
        console.error("Database Error:", error); // Log error lebih lengkap
        res.status(500).json({ error: error.message });
    }
}    
