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

    it('should return 400 when name is missing', async () => {
        const { sut } = makeSut()

        const res = await sut.execute({
            body: { ...httpRequest.body, name: undefined },
        })

        expect(res.statusCode).toBe(400)
    })

    it('should return 400 when description is missing', async () => {
        const { sut } = makeSut()

        const res = await sut.execute({
            body: { ...httpRequest.body, description: undefined },
        })

        expect(res.statusCode).toBe(400)
    })

    it('should return 400 when difficulty_level is missing', async () => {
        const { sut } = makeSut()

        const res = await sut.execute({
            body: { ...httpRequest.body, difficulty_level: undefined },
        })

        expect(res.statusCode).toBe(400)
    })

    it('should return 400 when difficulty_level is invalid', async () => {
        const { sut } = makeSut()

        const res = await sut.execute({
            body: {
                ...httpRequest.body,
                difficulty_level: 'invalid_difficulty_level',
            },
        })

        expect(res.statusCode).toBe(400)
    })
})
