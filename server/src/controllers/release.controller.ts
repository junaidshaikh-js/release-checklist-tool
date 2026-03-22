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
    const { name, additionalInfo } = req.body

    if (!name) {
      res.status(400).json({ error: 'Name is required.' })
      return
    }

    const newRelease = await prisma.release.create({
      data: {
        name,
        date: new Date(),
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

export const getReleaseById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    const release = await prisma.release.findUnique({
      where: { id: id as string },
      include: {
        checklist: true,
      },
    })

    if (!release) {
      res.status(404).json({ error: 'Release not found' })
      return
    }

    res.status(200).json(release)
  } catch (error) {
    next(error)
  }
}
