const session = require('express-session');
const MongoStore = require('connect-mongo');
const sessionConfig = () => {
  return session({
    secret: process.env.SESSION_SECRET || 'mi_secreto',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 5, // Establecer a 5 horas
      // maxAge: 1000 * 60 * 10, // Establecer a 10 minutos
      sameSite: 'lax',
    },
  });
};

module.exports = sessionConfig;
