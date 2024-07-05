import validator from 'validator'
import { badRequest, notFound, ok, serverError } from '../../helpers/http.js'
import { updateSportSchema } from '../../schemas/sport.js'
import { SportNotFoundError } from '../../errors/sport.js'
import { ZodError } from 'zod'

export class UpdateSportController {
    constructor(updateSportRepository) {
        this.updateSportRepository = updateSportRepository
    }

    async execute(httpRequest) {
        try {
            const sport_id = httpRequest.params.sport_id

            const idIsValid = validator.isUUID(sport_id)

            if (!idIsValid) {
                return badRequest({
                    errorMessage: 'The provided id is not valid',
                })
            }

            const params = httpRequest.body

            await updateSportSchema.parseAsync(params)

            const updatedSport = await this.updateSportRepository.execute(
                sport_id,
                params,
            )

            return ok(updatedSport)
        } catch (err) {
            if (err instanceof ZodError) {
                return badRequest({
                    message: err.errors[0].message,
                })
            }

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
