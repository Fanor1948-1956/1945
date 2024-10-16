const session = require("express-session");
const MongoStore = require("connect-mongo");

const sessionConfig = () => {
  return session({
    secret: process.env.SESSION_SECRET || "mi_secreto", // Utiliza una variable de entorno para mayor seguridad
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Cargado desde las variables de entorno
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // True si está en producción
      maxAge: 1000 * 60 * 60, // 1 hora
      sameSite: "lax", // Protege contra ataques CSRF
    },
  });
};

module.exports = sessionConfig;
