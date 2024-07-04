import validator from 'validator'

import { badRequest, ok, serverError } from '../helpers/http.js'
import { DeleteSportRepository } from '../repositories/sport/delete-sport.js'

export class DeleteSportController {
    async execute(httpRequest) {
        try {
            const sport_id = httpRequest.params.sport_id

            const idIsValid = validator.isUUID(sport_id)

            if (!idIsValid) {
                return badRequest({
                    errorMessage: 'Provided id is not valid',
                })
            }

            const deleteSportRepository = new DeleteSportRepository()
            const sport = await deleteSportRepository.execute(sport_id)

            return ok(sport)
        } catch (err) {
            console.error(err)

            return serverError()
        }
    }
}
