import express from 'express'
import { sportsRouter } from './src/routes/sport.js'

const app = express()

app.use(express.json())

app.use('/api/sports', sportsRouter)

app.listen(8080, () => console.log('Listening on port 8080'))
