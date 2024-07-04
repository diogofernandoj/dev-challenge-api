import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library.js'
import { db } from '../../../prisma/prisma.js'
import { SportNotFoundError } from '../../errors/sport.js'

export class DeleteSportRepository {
    async execute(sport_id) {
        try {
            return await db.sportsActivity.delete({
                where: {
                    id: sport_id,
                },
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                // P2025 = "An operation failed because it depends on one or more records that were required but not found" (from Prisma docs)
                if (error.code === 'P2025') {
                    throw new SportNotFoundError(sport_id)
                }
            }

            throw error
        }
    }
}
