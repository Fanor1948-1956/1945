// bulkRegisterRoles.js

const mongoose = require("mongoose");
const Role = require("../models/roleModel");
const Permission = require("../models/permissionModel"); // Asegúrate de tener este modelo
const connectDB = require("./database");
// Conectar a la base de datos


// Datos de ejemplo para insertar
const roles = [
  {
    name: "Admin",
    alias: "admin",
    description: "Rol de administrador",
    permissions: [],
  },
  {
    name: "Editor",
    alias: "editor",
    description: "Rol de editor",
    permissions: [],
  },
  {
    name: "Viewer",
    alias: "viewer",
    description: "Rol de solo lectura",
    permissions: [],
  },
  {
    name: "Manager",
    alias: "manager",
    description: "Rol de gerente",
    permissions: [],
  },
  {
    name: "Contributor",
    alias: "contributor",
    description: "Rol de colaborador",
    permissions: [],
  },
  {
    name: "Moderator",
    alias: "moderator",
    description: "Rol de moderador",
    permissions: [],
  },
  {
    name: "SuperAdmin",
    alias: "superadmin",
    description: "Rol de super administrador",
    permissions: [],
  },
  {
    name: "Guest",
    alias: "guest",
    description: "Rol de invitado",
    permissions: [],
  },
  {
    name: "Support",
    alias: "support",
    description: "Rol de soporte",
    permissions: [],
  },
  {
    name: "Auditor",
    alias: "auditor",
    description: "Rol de auditor",
    permissions: [],
  },
  {
    name: "Developer",
    alias: "developer",
    description: "Rol de desarrollador",
    permissions: [],
  },
  {
    name: "Designer",
    alias: "designer",
    description: "Rol de diseñador",
    permissions: [],
  },
  {
    name: "Analyst",
    alias: "analyst",
    description: "Rol de analista",
    permissions: [],
  },
  {
    name: "DataEntry",
    alias: "dataentry",
    description: "Rol de entrada de datos",
    permissions: [],
  },
  {
    name: "HR",
    alias: "hr",
    description: "Rol de recursos humanos",
    permissions: [],
  },
];

// Función para registrar roles
const registerRoles = async () => {
  try {
    await connectDB(); // Conectar a la base de datos
    // Recuperar los permisos desde la base de datos
    const permissions = await Permission.find(); // Asegúrate de que tu modelo de permisos esté bien definido

    // Asegúrate de que hay permisos en la base de datos
    if (permissions.length === 0) {
      console.log(
        "No hay permisos en la base de datos para asignar a los roles."
      );
      return;
    }

    // Asignar permisos a cada rol (ejemplo, asignando todos los permisos a cada rol)
    roles.forEach((role) => {
      // Aquí puedes modificar la lógica para asignar permisos específicos según tus necesidades
      role.permissions = permissions.map((permission) => permission._id);
    });

    // Insertar roles en la base de datos
    await Role.insertMany(roles);
    console.log("Roles registrados con éxito");
  } catch (error) {
    console.error("Error al registrar roles", error);
  } finally {
    mongoose.connection.close(); // Cerrar la conexión a la base de datos
  }
};

// Llamar a la función
registerRoles();
