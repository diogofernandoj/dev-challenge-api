import { db } from '../../../prisma/prisma.js'

export class CreateSportRepository {
    async execute(params) {
        return await db.sportsActivity.create({
            data: {
                id: params.id,
                name: params.name,
                description: params.description,
                difficulty_level: params.difficulty_level,
            },
        })
    }
}
