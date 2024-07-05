import validator from 'validator'
import { badRequest, notFound, ok, serverError } from '../../helpers/http.js'
import { GetSportByIdRepository } from '../../repositories/sport/get-sport-by-id.js'
import { SportNotFoundError } from '../../errors/sport.js'

export class GetSportByIdController {
    async execute(httpRequest) {
        try {
            const sport_id = httpRequest.params.sport_id

            const idIsValid = validator.isUUID(sport_id)

            if (!idIsValid) {
                return badRequest({
                    errorMessage: 'The provided id is not valid',
                })
            }

            const getSportByIdRepository = new GetSportByIdRepository()
            const sport = await getSportByIdRepository.execute(sport_id)

            if (!sport) {
                throw new SportNotFoundError(sport_id)
            }

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
