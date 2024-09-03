import { Request, Response } from "express";
import prisma from "../../utils/prisma";

export async function getHomesByUser(req: Request, res: Response) {
  const userId = parseInt(req.query.userId as string);
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = 50;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const homes = await prisma.home.findMany({
      where: {
        user_home_link: {
          some: {
            userId: userId,
          },
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const allHomes = await prisma.home.count({
      where: {
        user_home_link: {
          some: {
            userId: userId,
          },
        },
      },
    });

    const totalPages = Math.ceil(allHomes / pageSize);

    if (homes.length === 0) {
      return res.status(404).json({ message: "No homes found for this user" });
    }
    res.status(200).json({
      homes,
      currentPage: page,
      totalPages,
      allHomes,
    });
  } catch (error) {
    console.error("Error fetching homes for user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching homes for the user" });
  }
}

export async function updateUsers() {}
