const { MONGO_USER, MONGO_PASS, MONGO_IP, MONGO_PORT, EXPRESS_API_PORT} = require('./config/config')
const express = require('express')
const app = express()

const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const verifyJWT = require('./middleware/verifyJWT');
const credentials = require('./middleware/credentials');

var cookieParser = require('cookie-parser')


const mongoose = require('mongoose')
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
// const mongoURL = `mongodb://sanjeev:mypassword@mongo:27017/?authSource=admin`
const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewURLParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    })
    .then(() => console.log("-- Mongoose Connected --"))
    .catch((err) => {
      console.error(err)
      setTimeout(connectWithRetry, 5000)
    })
}
connectWithRetry()

app.use(credentials)
app.enable('trust proxy', 1) //? use when running behind ngnix
app.use(cors(corsOptions))
app.use(express.json())
app.set('json spaces', 2) //? prettyfiy json in browser

app.use(cookieParser())


app.get('/', (req, res) => {
  
  res.json({ title: 'Engagement api - http://', message: 'trying to learn node + docker' })
})


// /api/v1/posts
app.use('/api/v1/posts', require('./routes/postRoutes'))
// TODO create second route for registering so users route can be private
app.use('/api/v1/users', require('./routes/userRoutes'))
app.use('/api/v1/refresh', require('./routes/refresh'));

app.use(verifyJWT);
app.use('/api/v1/engagements', require('./routes/engagementRts'))

//? routes that need to verify

const port = EXPRESS_API_PORT || 3001

// sslServer.listen(port, () => console.log(`-- Express SSL Server: https://localhost:${port} --`))
app.listen(port, () => console.log(`-- Express Connected. INTERNAL_PORT :${port} --`))

//! must go at the bottom of exp.get calls
app.use((req, res) => {
  res.status(404).json({ error: "404", message: "nothing, null, nada" })
})