import { ZodError } from 'zod'

import { badRequest, created, serverError } from '../../helpers/http.js'
import { createSportSchema } from '../../schemas/sport.js'
import { CreateSportRepository } from '../../repositories/sport/create-sport.js'

export class CreateSportController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            await createSportSchema.parseAsync(params)

            const createSportRepository = new CreateSportRepository()
            const createdSport = await createSportRepository.execute(params)

            return created(createdSport)
        } catch (err) {
            if (err instanceof ZodError) {
                return badRequest({
                    message: err.errors[0].message,
                })
            }
            console.error(err)

            return serverError()
        }
    }
}
