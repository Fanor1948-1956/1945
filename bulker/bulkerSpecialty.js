// bulkbulkerSpecialty.js

const mongoose = require("mongoose");
const Specialty = require("../models/Specialty");

// Conectar a la base de datos
mongoose
  .connect(
    "mongodb+srv://fanoro1945:fanoro1945@cluster0.j7bgf.mongodb.net/andres?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos", err);
  });

// Datos de ejemplo para insertar
const specialties = [
  {
    name: "Cardiología",
    description:
      "Especialidad médica que se ocupa del diagnóstico y tratamiento de enfermedades del corazón.",
  },
  {
    name: "Dermatología",
    description:
      "Rama de la medicina que se encarga de las enfermedades de la piel.",
  },
  {
    name: "Pediatría",
    description:
      "Especialidad médica que se ocupa del cuidado de los niños y adolescentes.",
  },
  {
    name: "Neurología",
    description: "Estudia y trata los trastornos del sistema nervioso.",
  },
  {
    name: "Oncología",
    description:
      "Especialidad médica que se dedica al diagnóstico y tratamiento del cáncer.",
  },
  {
    name: "Ginecología",
    description:
      "Rama de la medicina que se especializa en la salud femenina y el sistema reproductivo.",
  },
  {
    name: "Psiquiatría",
    description: "Especialidad médica que se ocupa de los trastornos mentales.",
  },
  {
    name: "Endocrinología",
    description: "Estudia las glándulas y las hormonas del cuerpo.",
  },
  {
    name: "Oftalmología",
    description:
      "Rama de la medicina que se ocupa del diagnóstico y tratamiento de enfermedades de los ojos.",
  },
  {
    name: "Otorrinolaringología",
    description:
      "Especialidad médica que se ocupa de las enfermedades de la garganta, nariz y oídos.",
  },
  {
    name: "Reumatología",
    description:
      "Se enfoca en las enfermedades autoinmunes y del tejido conectivo.",
  },
  {
    name: "Gastroenterología",
    description: "Rama de la medicina que se ocupa del sistema digestivo.",
  },
  {
    name: "Traumatología",
    description: "Estudia y trata lesiones del aparato locomotor.",
  },
  {
    name: "Urología",
    description:
      "Rama de la medicina que se ocupa de las enfermedades del tracto urinario.",
  },
  {
    name: "Infectología",
    description:
      "Se especializa en el diagnóstico y tratamiento de enfermedades infecciosas.",
  },
  {
    name: "Neumología",
    description:
      "Rama de la medicina que se ocupa de los problemas respiratorios.",
  },
  {
    name: "Medicina General",
    description:
      "Atención médica primaria para el diagnóstico y tratamiento general.",
  },
  {
    name: "Cirugía General",
    description:
      "Realiza intervenciones quirúrgicas en diferentes áreas del cuerpo.",
  },
  {
    name: "Anestesiología",
    description: "Se ocupa de la anestesia y cuidados perioperatorios.",
  },
  {
    name: "Medicina Interna",
    description:
      "Enfocada en el diagnóstico y tratamiento de enfermedades en adultos.",
  },
  { name: "Pediatría", description: "Cuidado médico de niños y adolescentes." },
  {
    name: "Geriatría",
    description: "Se ocupa de la salud y cuidados de los ancianos.",
  },
];

// Función para registrar especialidades
const bulkerSpecialty = async () => {
  try {
    await Specialty.insertMany(specialties);
    console.log("Especialidades registradas con éxito");
  } catch (error) {
    console.error("Error al registrar especialidades", error);
  } finally {
    mongoose.connection.close(); // Cerrar la conexión a la base de datos
  }
};

// Llamar a la función
bulkerSpecialty();
