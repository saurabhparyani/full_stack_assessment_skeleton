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

export async function getUsersByHome(req: Request, res: Response) {
    const homeId = parseInt(req.query.homeId as string)
    if(!homeId || isNaN(homeId) || homeId <= 0) {
        return res.status(400).json({ error: "Home ID is required"});
    }
    try {
        const users = await prisma.user.findMany({
            where: {
                user_home_link: {
                    some: {
                        homeId: homeId
                    }
                }
            }
        })
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found for this home" });
        }
        res.status(200).json(users);
    } catch (error) {
        
    }
}