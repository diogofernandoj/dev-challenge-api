import { faker } from '@faker-js/faker'

import { UpdateSportController } from './update-sport.js'
import { DifficultyLevel } from '@prisma/client'

describe('UpdateSportsController', () => {
    class UpdateSportsRepositoryStub {
        async execute() {
            return true
        }
    }

    const makeSut = () => {
        const updateSportsRepository = new UpdateSportsRepositoryStub()
        const sut = new UpdateSportController(updateSportsRepository)

        return { sut, updateSportsRepository }
    }

    const httpRequest = {
        params: {
            sport_id: faker.string.uuid(),
        },
        body: {
            name: faker.string.alpha(10),
            description: faker.string.alpha(20),
            difficulty_level: faker.helpers.enumValue(DifficultyLevel),
        },
    }

    it('should return 200 on updating a sport successfully', async () => {
        const { sut } = makeSut()

        const res = await sut.execute(httpRequest)

        expect(res.statusCode).toBe(200)
    })

    it('should return 400 when provided id is not valid', async () => {
        const { sut } = makeSut()

        const res = await sut.execute({
            params: { sport_id: 'invalid_id' },
            body: httpRequest.body,
        })

        expect(res.statusCode).toBe(400)
    })
})
