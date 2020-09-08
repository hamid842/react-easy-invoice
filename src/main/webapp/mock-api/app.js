import express from 'express'
import apiMocker from 'connect-api-mocker'

const port = 3000
const app = express()

app.use('/api',apiMocker('mock-api'))
console.log(`Mock API Server is up and runnig at: http://localhost:${port}`)
app.listen(port)

