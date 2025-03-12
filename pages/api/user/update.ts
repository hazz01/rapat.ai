import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, SubscriptionType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') return res.status(405).json({ message: 'Method not allowed' });

    const { id, name, email, password, subscriptionType } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        let passwordHash;
        
        if (password) {
            const salt = await bcrypt.genSalt(10);
            passwordHash = await bcrypt.hash(password, salt);
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                name,
                email,
                ...(passwordHash && { passwordHash }), // Update hanya jika password diisi
                subscriptionType: subscriptionType?.toUpperCase() as SubscriptionType, // Normalisasi enum
            },
        });

        return res.status(200).json(updatedUser);
    } catch (error: any) {
        console.error("Update Error:", error);
        return res.status(500).json({ error: error.message });
    }
}
