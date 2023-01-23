export default {
  port: process.env.PORT || 3003,
  jwtSecret: process.env.JWT_SECRET || '1kZDnw8==jh',
  mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/rem'
}
