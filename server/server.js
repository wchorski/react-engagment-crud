const { MONGO_USER, MONGO_PASS, MONGO_IP, MONGO_PORT, SESSION_SECRET, REDIS_URL, REDIS_PORT, EXPRESS_PORT } = require('./config/config')
const express = require('express')
const app = express()
const https = require('https')
const path = require('path')
const fs = require('fs')
const cors = require('cors')

const session = require('express-session')
const redis = require('redis')
// const connectRedis = require('connect-redis')
// let RedisStore = connectRedis(session)
// let redisClient = redis.createClient({
//   host: REDIS_URL,
//   port: REDIS_PORT
// })


const mongoose = require('mongoose')
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
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

// TODO use when running behind ngnix
app.enable('trust proxy')
app.use(cors({}))
app.use(session({

  secret: SESSION_SECRET,
  credentials: true,
  saveUninitialized: false,
  resave: false,

  //   store: new RedisStore({client: redisClient}),
  cookie: {
    // secure: process.env.NODE_ENV === 'production' ? 'true' : 'auto',
    secure: false,
    httpOnly: true,
    maxAge: 60000000,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    //   },
  }))

app.use(express.json())

app.set('json spaces', 2) //? prettyfiy json in browser
app.get('/', (req, res) => {
  res.json({ title: 'Engagement api - SSL SECURED', message: 'trying to learn node + docker' })
})

app.get("/users", (req, res) => {
  res.json({ title: "users" })
})

const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRoutes')
const engagementRtr = require('./routes/engagementRts')
// localhost:3001/api/v1/posts
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/engagements', engagementRtr)

const port = process.env.PORT || 3001

// app.listen(port, () => console.log(`-- Listening on port ${port} --`))

const sslServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app)

sslServer.listen(port, () => console.log(`--Express SSL Server: port ${port}--`))

//! must go at the bottom of exp.get calls
app.use((req, res) => {
  res.status(404).json({ error: "404", message: "nothing, null, nada" })
})