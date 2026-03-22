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
      res.status(400).json({ error: 'Name and date are required.' })
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

export const updateRelease = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const { name, date, status, additionalInfo, checklist } = req.body

    const updateData: {
      name?: string
      date?: Date
      status?: string
      additionalInfo?: string | null
      checklist?: {
        update: Record<string, boolean>
      }
    } = {}

    if (name) updateData.name = name
    if (status) updateData.status = status
    if (additionalInfo !== undefined) updateData.additionalInfo = additionalInfo
    if (date) updateData.date = new Date(date)
    if (checklist) {
      updateData.checklist = {
        update: checklist,
      }
    }

    const updatedRelease = await prisma.release.update({
      where: { id: id as string },
      data: updateData,
      include: {
        checklist: true,
      },
    })

    res.status(200).json(updatedRelease)
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === 'P2025') {
      res.status(404).json({ error: 'Release not found' })
      return
    }
    next(error)
  }
}
