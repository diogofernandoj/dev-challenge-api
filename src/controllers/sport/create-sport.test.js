import { DifficultyLevel } from '@prisma/client'
import { CreateSportController } from './create-sport.js'

import { faker } from '@faker-js/faker'

describe('CreateSportController', () => {
    class CreateSportRepositoryStub {
        async execute() {
            return true
        }
    }

    const makeSut = () => {
        const createSportRepository = new CreateSportRepositoryStub()
        const sut = new CreateSportController(createSportRepository)

        return { sut, createSportRepository }
    }

    const httpRequest = {
        body: {
            name: faker.string.alpha(10),
            description: faker.string.alpha(20),
            difficulty_level: faker.helpers.enumValue(DifficultyLevel),
        },
    }

    it('should return 201 on creating a sport successfully', async () => {
        const { sut } = makeSut()

        const res = await sut.execute(httpRequest)

        expect(res.statusCode).toBe(201)
    })
})
