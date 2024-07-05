import express from 'express'

import { CreateSportController } from './src/controllers/sport/create-sport.js'
import { DeleteSportController } from './src/controllers/sport/delete-sport.js'
import { GetSportsController } from './src/controllers/sport/get-sports.js'
import { GetSportByIdController } from './src/controllers/sport/get-sport-by-id.js'

const app = express()

app.use(express.json())

app.get('/sports', async (_req, res) => {
    const getSportsController = new GetSportsController()
    const { statusCode, body } = await getSportsController.execute()

    res.status(statusCode).send(body)
})

app.get('/sports/:sport_id', async (req, res) => {
    const getSportByIdController = new GetSportByIdController()
    const { statusCode, body } = await getSportByIdController.execute(req)

    res.status(statusCode).send(body)
})

app.post('/', async (req, res) => {
    const createSportController = new CreateSportController()
    const { statusCode, body } = await createSportController.execute(req)

    res.status(statusCode).send(body)
})

app.delete('/:sport_id', async (req, res) => {
    const deleteSportController = new DeleteSportController()
    const { statusCode, body } = await deleteSportController.execute(req)

    res.status(statusCode).send(body)
})

app.listen(8080, () => console.log('Listening on port 8080'))
