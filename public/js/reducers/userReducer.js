import { setState, getState } from "./state.js";


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


export const updateUser = (updatedUser) => {
  const currentState = getState();
  const updatedUsers = currentState.users.map((user) =>
    user._id === updatedUser._id ? updatedUser : user
  );
  setState({ users: updatedUsers });
};


export const deleteUser = (userId) => {
  const currentState = getState();
  const updatedUsers = currentState.users.filter((user) => user._id !== userId);
  setState({ users: updatedUsers });
};
