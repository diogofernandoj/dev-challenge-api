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
    GetSportByIdRepository,
    GetSportsRepository,
    UpdateSportRepository,
} from '../repositories/index.js'

export const sportsRouter = Router()

// SPORTS ROUTES
sportsRouter.get('/', async (_req, res) => {
    const getSportsRepository = new GetSportsRepository()
    const getSportsController = new GetSportsController(getSportsRepository)
    const { statusCode, body } = await getSportsController.execute()

    res.status(statusCode).send(body)
})

sportsRouter.get('/:sport_id', async (req, res) => {
    const getSportByIdRepository = new GetSportByIdRepository()
    const getSportByIdController = new GetSportByIdController(
        getSportByIdRepository,
    )
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
    const updateSportRepository = new UpdateSportRepository()
    const updateSportController = new UpdateSportController(
        updateSportRepository,
    )
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
