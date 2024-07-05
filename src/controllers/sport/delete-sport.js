import validator from 'validator'

import { badRequest, notFound, ok, serverError } from '../../helpers/http.js'
import { SportNotFoundError } from '../../errors/sport.js'

export class DeleteSportController {
    constructor(deleteSportRepository) {
        this.deleteSportRepository = deleteSportRepository
    }

    async execute(httpRequest) {
        try {
            const sport_id = httpRequest.params.sport_id

            const idIsValid = validator.isUUID(sport_id)

            if (!idIsValid) {
                return badRequest({
                    errorMessage: 'Provided id is not valid',
                })
            }

            const sport = await this.deleteSportRepository.execute(sport_id)

            return ok(sport)
        } catch (err) {
            if (err instanceof SportNotFoundError) {
                return notFound({
                    errorMessage: 'Sport not found',
                })
            }

            console.error(err)

            return serverError()
        }
    }
}
