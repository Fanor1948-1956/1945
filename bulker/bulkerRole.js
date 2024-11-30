

const mongoose = require("mongoose");
const Role = require("../models/roleModel");
const Permission = require("../models/permissionModel"); 
const connectDB = require("./database");




const roles = [
  {
    name: "Administrador",
    alias: "admin",
    description: "Rol de administrador",
    permissions: [],
  },
    {
    name: 'Doctor',
    alias: 'doctor',
    description: 'Rol para doctores con permisos de atención'
  },
  {
    name: "Paciente",
    alias: "patient",
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


const registerRoles = async () => {
  try {
    await connectDB(); 
    
    const permissions = await Permission.find(); 

    
    if (permissions.length === 0) {
      console.log(
        "No hay permisos en la base de datos para asignar a los roles."
      );
      return;
    }

    
    roles.forEach((role) => {
      
      role.permissions = permissions.map((permission) => permission._id);
    });

    
    await Role.insertMany(roles);
    console.log("Roles registrados con éxito");
  } catch (error) {
    console.error("Error al registrar roles", error);
  } finally {
    mongoose.connection.close(); 
  }
};


registerRoles();
