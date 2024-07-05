import { ok, serverError } from '../../helpers/http.js'

export class GetSportsController {
    constructor(getSportsRepository) {
        this.getSportsRepository = getSportsRepository
    }

    async execute() {
        try {
            const sports = await this.getSportsRepository.execute()

            return ok(sports)
        } catch (err) {
            console.error(err)

            return serverError()
        }
    }
}
