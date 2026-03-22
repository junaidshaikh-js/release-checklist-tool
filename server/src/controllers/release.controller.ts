import { type Request, type Response, type NextFunction } from 'express';
import { prisma } from '../lib/PrismaClient';

export const getReleases = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const releases = await prisma.release.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json(releases);
  } catch (error) {
    next(error);
  }
};
