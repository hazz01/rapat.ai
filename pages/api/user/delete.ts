import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') return res.status(405).json({ message: 'Method not allowed' });

    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        // Periksa apakah user ada sebelum menghapus
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Hapus user
        const deletedUser = await prisma.user.delete({ where: { id } });

        return res.status(200).json({ message: 'User deleted successfully', deletedUser });

    } catch (error: any) {
        console.error("Delete Error:", error);

        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'User not found or already deleted' });
        }

        return res.status(500).json({ error: 'Internal server error' });
    }
}
