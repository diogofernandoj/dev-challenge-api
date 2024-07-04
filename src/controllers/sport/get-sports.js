import { GetSportsRepository } from '../../repositories/sport/get-sports.js'
import { ok, serverError } from '../../helpers/http.js'

export class GetSportsController {
    async execute() {
        try {
            const getSportsRepository = new GetSportsRepository()

            const sports = await getSportsRepository.execute()

            return ok(sports)
        } catch (err) {
            console.error(err)

            return serverError()
        }
    }
}
