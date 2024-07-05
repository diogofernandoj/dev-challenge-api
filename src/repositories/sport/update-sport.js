import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { SportNotFoundError } from '../../errors/sport.js'
import { db } from '../../../prisma/prisma.js'

export class UpdateSportRepository {
    async execute(sport_id, params) {
        try {
            return await db.sportsActivity.update({
                where: {
                    id: sport_id,
                },
                data: params,
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
