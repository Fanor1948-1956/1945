import { setState, getState } from "./state.js";

// Cargar usuarios en el estado
export const loadUsers = (usersResponse) => {
  if (Array.isArray(usersResponse.users)) {
    setState({ users: usersResponse.users });
    console.log("Estado después de cargar usuarios:", getState());
  } else {
    console.error(
      "loadUsers: La respuesta no contiene un array de usuarios",
      usersResponse
    );
  }
};

// Agregar un nuevo usuario
export const addUser = (newUser) => {
  const currentState = getState();
  if (Array.isArray(currentState.users)) {
    setState({ users: [...currentState.users, newUser] });
  } else {
    console.error(
      "addUser: currentState.users no es un array",
      currentState.users
    );
  }
};

// Actualizar un usuario existente
export const updateUser = (updatedUser) => {
  const currentState = getState();
  const updatedUsers = currentState.users.map((user) =>
    user._id === updatedUser._id ? updatedUser : user
  );
  setState({ users: updatedUsers });
};

// Eliminar un usuario
export const deleteUser = (userId) => {
  const currentState = getState();
  const updatedUsers = currentState.users.filter((user) => user._id !== userId);
  setState({ users: updatedUsers });
};
