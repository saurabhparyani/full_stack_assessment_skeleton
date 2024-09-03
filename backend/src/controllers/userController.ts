import { Request, Response } from "express";
import prisma from "../../utils/prisma";

export async function getAllUsers(req:Request, res:Response) {
    try {
        const users = await prisma.user.findMany({});
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'An error occurred while fetching users' });
    }
}

export async function getUsersByHome() {
}