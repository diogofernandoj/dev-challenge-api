import express from 'express'

import { CreateSportController } from './src/controllers/sport/create-sport.js'
import { DeleteSportController } from './src/controllers/delete-sport.js'

const app = express()

app.use(express.json())

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
