import { db } from '../../../prisma/prisma.js'

export class DeleteSportRepository {
    async execute(sport_id) {
        return await db.sportsActivity.delete({
            where: {
                id: sport_id,
            },
        })
    }
}
