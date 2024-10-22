const session = require("express-session");
const MongoStore = require("connect-mongo");

const sessionConfig = () => {
  return session({
    secret: process.env.SESSION_SECRET || "mi_secreto", 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, 
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      maxAge: 1000 * 60 * 60, 
      sameSite: "lax", 
    },
  });
};

module.exports = sessionConfig;
