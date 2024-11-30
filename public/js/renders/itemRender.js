export const userRenderer = user => ({
  _id: user._id,
  usuario: `${user.name} ${user.surnames}`,
  email: user.email,
  gender: user.gender,
  roles: user.roles.map(role => role.name).join(', '),
  uploads: user.uploads // Aquí puedes procesar lo que quieras mostrar de uploads
})

// Renderizadores específicos para cada rol
export const adminRenderer = user => {
  const baseUser = userRenderer(user)
  return {
    ...baseUser,
    adminLevel: user.adminLevel || '', // Propiedad adicional del admin
    department: user.department || '' // Otras propiedades que podrían ser específicas del admin
  }
}

export const doctorRenderer = user => {
  const baseUser = userRenderer(user)
  return {
    ...baseUser,
    specialties: user.specialties
      ? user.specialties.map(specialty => specialty.name)
      : [],
    schedule: user.schedule || [],
    city: user.city || ''
  }
}

export const chiefmedicalRenderer = user => {
  const baseUser = userRenderer(user)
  return {
    ...baseUser,
    department: user.department || '',
    specialties: user.specialties || []
  }
}

export const patientRenderer = user => {
  const baseUser = userRenderer(user)
  return {
    ...baseUser,
    appointments: user.appointments || [],
    medicalHistory: user.medicalHistory || []
  }
}

// Base de encabezados comunes
const baseHeaders = ['Nombre Completo', 'Correo', 'Género', 'Roles']

// Función para obtener los encabezados según el rol
export const getHeadersForRole = role => {
  // Base común de encabezados
  const headers = [...baseHeaders]

  // Agregar encabezados adicionales según el rol
  switch (role) {
    case 'admin':
      headers.push('Nivel Admin', 'Departamento')
      break
    case 'doctor':
      headers.push('Especialidades', 'Horario', 'Ciudad')
      break
    case 'chiefmedical':
      headers.push('Departamento', 'Especialidades')
      break
    case 'patient':
      headers.push('Citas Médicas', 'Historial Médico')
      break
    default:
      break
  }

  return headers
}

// js/renders/itemRender.js
export const specialtyRenderer = specialty => ({
  _id: specialty._id,
  name: specialty.name,
  description: specialty.description,
  isActive: specialty.isActive ? 'Activo' : 'Inactivo'
})

export const permissionRenderer = permission => ({
  _id: permission._id,
  name: permission.name,
  description: permission.description,
  isActive: permission.isActive ? 'Activo' : 'Inactivo'
})
