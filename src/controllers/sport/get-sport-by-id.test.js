import { faker } from '@faker-js/faker'

import { GetSportByIdController } from './get-sport-by-id.js'

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
})
