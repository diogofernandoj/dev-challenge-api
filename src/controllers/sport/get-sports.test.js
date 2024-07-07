import { GetSportsController } from './get-sports.js'

describe('GetSportsController', () => {
    class GetSportsRepositoryStub {
        async execute() {
            return true
        }
    }

    const makeSut = () => {
        const getSportsRepository = new GetSportsRepositoryStub()
        const sut = new GetSportsController(getSportsRepository)

        return { sut, getSportsRepository }
    }

    it('should return 200 on getting sports successfully', async () => {
        const { sut } = makeSut()

        const res = await sut.execute()

        expect(res.statusCode).toBe(200)
    })
})
