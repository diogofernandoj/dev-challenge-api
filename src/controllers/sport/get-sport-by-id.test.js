import { faker } from '@faker-js/faker'

import { GetSportByIdController } from './get-sport-by-id.js'
import { SportNotFoundError } from '../../errors/sport.js'

describe('GetSportByIdController', () => {
    class GetSportByIdRepositoryStub {
        async execute() {
            return true
        }
    }

    const makeSut = () => {
        const getSportByIdRepository = new GetSportByIdRepositoryStub()
        const sut = new GetSportByIdController(getSportByIdRepository)

        return { sut, getSportByIdRepository }
    }

    const httpRequest = {
        params: {
            sport_id: faker.string.uuid(),
        },
    }

    it('should return 200 on getting a sport by id successfully', async () => {
        const { sut } = makeSut()

        const res = await sut.execute(httpRequest)

        expect(res.statusCode).toBe(200)
    })

    it('should return 400 when provided id is not valid', async () => {
        const { sut } = makeSut()

        const res = await sut.execute({ params: { sport_id: 'invalid_id' } })

        expect(res.statusCode).toBe(400)
    })

    it('should return 404 when no sport is found', async () => {
        const { sut, getSportByIdRepository } = makeSut()
        jest.spyOn(getSportByIdRepository, 'execute').mockRejectedValueOnce(
            new SportNotFoundError(httpRequest.params.sport_id),
        )

        const res = await sut.execute(httpRequest)

        expect(res.statusCode).toBe(404)
    })
})
