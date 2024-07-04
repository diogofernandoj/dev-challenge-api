import { db } from '../../../prisma/prisma.js'

export class GetSportsRepository {
    async execute() {
        return await db.sportsActivity.findMany({})
    }
}
