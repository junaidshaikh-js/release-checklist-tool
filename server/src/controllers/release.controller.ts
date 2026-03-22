import { type Request, type Response, type NextFunction } from 'express'
import { prisma } from '../lib/PrismaClient'

export const getReleases = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const releases = await prisma.release.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    res.status(200).json(releases)
  } catch (error) {
    next(error)
  }
}

export const createRelease = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, date, additionalInfo } = req.body

    if (!name || !date) {
      res.status(400).json({ error: 'Name and date are required fields.' })
      return
    }

    const newRelease = await prisma.release.create({
      data: {
        name,
        date: new Date(date),
        status: 'planned',
        additionalInfo: additionalInfo || null,
        checklist: {
          create: {},
        },
      },
    })

    res.status(201).json(newRelease)
  } catch (error) {
    next(error)
  }
}
