import { faker } from '@faker-js/faker'
import { DeleteSportController } from './delete-sport.js'

describe('DeleteSportController', () => {
    class DeleteSportRepositoryStub {
        async execute() {
            return true
        }
    }

    const makeSut = () => {
        const deleteSportRepository = new DeleteSportRepositoryStub()
        const sut = new DeleteSportController(deleteSportRepository)

        return { sut, deleteSportRepository }
    }

    const httpRequest = {
        params: {
            sport_id: faker.string.uuid(),
        },
    }

    it('should return 200 on deleting a sport successfully', async () => {
        const { sut } = makeSut()

        const res = await sut.execute(httpRequest)

        expect(res.statusCode).toBe(200)
    })
})
