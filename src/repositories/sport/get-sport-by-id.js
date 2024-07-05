import { db } from '../../../prisma/prisma.js'

export class GetSportByIdRepository {
    async execute(sport_id) {
        return await db.sportsActivity.findUnique({
            where: {
                id: sport_id,
            },
        })
    }
}
