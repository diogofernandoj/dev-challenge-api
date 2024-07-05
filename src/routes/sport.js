import { Router } from 'express'
import {
    CreateSportController,
    DeleteSportController,
    GetSportByIdController,
    GetSportsController,
    UpdateSportController,
} from '../controllers/index.js'

import {
    CreateSportRepository,
    DeleteSportRepository,
} from '../repositories/index.js'

export const sportsRouter = Router()

// SPORTS ROUTES

sportsRouter.get('/', async (_req, res) => {
    const getSportsController = new GetSportsController()
    const { statusCode, body } = await getSportsController.execute()

    res.status(statusCode).send(body)
})

sportsRouter.get('/:sport_id', async (req, res) => {
    const getSportByIdController = new GetSportByIdController()
    const { statusCode, body } = await getSportByIdController.execute(req)

    res.status(statusCode).send(body)
})

sportsRouter.post('/', async (req, res) => {
    const createSportRepository = new CreateSportRepository()
    const createSportController = new CreateSportController(
        createSportRepository,
    )
    const { statusCode, body } = await createSportController.execute(req)

    res.status(statusCode).send(body)
})

sportsRouter.patch('/:sport_id', async (req, res) => {
    const updateSportController = new UpdateSportController()
    const { statusCode, body } = await updateSportController.execute(req)

    res.status(statusCode).send(body)
})

sportsRouter.delete('/:sport_id', async (req, res) => {
    const deleteSportRepository = new DeleteSportRepository()
    const deleteSportController = new DeleteSportController(
        deleteSportRepository,
    )
    const { statusCode, body } = await deleteSportController.execute(req)

    res.status(statusCode).send(body)
})
