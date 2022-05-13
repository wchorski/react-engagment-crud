const { MONGO_USER, MONGO_PASS, MONGO_IP, MONGO_PORT, SESSION_SECRET, REDIS_URL, REDIS_PORT, EXPRESS_API_IP, EXPRESS_API_PORT, MY_VARIABLE} = require('./config/config')
console.log(MY_VARIABLE);
const express = require('express')
const app = express()
// const https = require('https')
// const path = require('path')
// const fs = require('fs')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const credentials = require('./middleware/credentials');


// TODO help from Tom
// const cookie_parser = require('cookie-parser')
var cookieParser = require('cookie-parser')

const session = require('express-session')
const redis = require('redis')
let RedisStore = require('connect-redis')(session)

let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT
})



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

//? session middleware
app.use(session({
  store: new RedisStore({client: redisClient}),
  secret: SESSION_SECRET,
  credentials: true,
  name: 'connect.sid',
  resave: false,


  cookie: {
    secure: false, //TODO make this variable with NODE_ENV
    httpOnly: true,
    maxAge: (1000 * 60) * 60,
    whatisthis: 'idk',
    sameSite: "none",
    // sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax'
  }
}))

app.get('/', (req, res) => {
  
  console.log(req.cookies);
  res.json({ title: 'Engagement api - http://', message: 'trying to learn node + docker' })
})

app.get("/users", (req, res) => {
  res.json({ title: "users" })
})


// /api/v1/posts
app.use('/api/v1/posts', require('./routes/postRoutes'))
app.use('/api/v1/users', require('./routes/userRoutes'))
app.use('/api/v1/engagements', require('./routes/engagementRts'))
app.use('/api/v1/refresh', require('./routes/refresh'));

const port = EXPRESS_API_PORT || 3001

// const sslServer = https.createServer({
//   key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//   cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
// }, app)

// sslServer.listen(port, () => console.log(`-- Express SSL Server: https://localhost:${port} --`))
app.listen(port, () => console.log(`-- Express Connected. INTERNAL_PORT :${port} --`))

//! must go at the bottom of exp.get calls
app.use((req, res) => {
  res.status(404).json({ error: "404", message: "nothing, null, nada" })
})