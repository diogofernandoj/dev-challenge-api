import { faker } from '@faker-js/faker'
import { DeleteSportController } from './delete-sport.js'
import { SportNotFoundError } from '../../errors/sport.js'

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

    it('should return 400 when id is invalid', async () => {
        const { sut } = makeSut()

        const res = await sut.execute({ params: { sport_id: 'invalid_id' } })

        expect(res.statusCode).toBe(400)
    })

    it('should return 404 when no transaction is found', async () => {
        const { sut, deleteSportRepository } = makeSut()
        jest.spyOn(deleteSportRepository, 'execute').mockRejectedValueOnce(
            new SportNotFoundError(httpRequest.params.sport_id),
        )

        const res = await sut.execute(httpRequest)

        expect(res.statusCode).toBe(404)
    })
})
