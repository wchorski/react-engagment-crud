module.exports = {
  MONGO_IP: process.env.MONGO_IP || "mongo",
  // MONGO_IP: process.env.MONGO_IP || "localhost",
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_USER: process.env.MONGO_USER || "sanjeev",
  MONGO_PASS: process.env.MONGO_PASS || "mypassword",
  REDIS_URL: process.env.REDIS_URL || 'redis',
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  SESSION_SECRET: process.env.SESSION_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  INTERNAL_PORT: process.env.INTERNAL_PORT || 3001,
  MY_VARIABLE: process.env.MY_VARIABLE || "MY_VARIABLE = notset"
}