export const userRenderer = (user) => ({
  _id: user._id,
  usuario: `${user.name} ${user.surnames}`,
  email: user.email,
  gender: user.gender,
  roles: user.roles.map((role) => role.name).join(', '),
  uploads: user.uploads,
});

// js/renders/itemRender.js
export const specialtyRenderer = (specialty) => ({
  _id: specialty._id,
  name: specialty.name,
  description: specialty.description,
  isActive: specialty.isActive ? 'Activo' : 'Inactivo',
});
