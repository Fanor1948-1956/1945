import { setState, getState } from './state.js'

export const loadSpecialties = specialtiesResponse => {
  if (Array.isArray(specialtiesResponse.specialties)) {
    setState({ specialties: specialtiesResponse.specialties })
    console.log('Estado después de cargar specialties:', getState())
  } else {
    console.error(
      'loadspecialties: La respuesta no contiene un array de specialties',
      specialtiesResponse
    )
  }
}

export const addSpecialty = newSpecialty => {
  const currentState = getState()

  if (Array.isArray(currentState.specialties)) {
    setState({ specialties: [...currentState.specialties, newSpecialty] })
  } else {
    console.error(
      'addItem: currentState.specialties no es un array',
      currentState.specialties
    )
  }
}

export const updateSpecialty = updatedItem => {
  const currentState = getState()
  const updatedSpecialties = currentState.specialties.map(item =>
    item._id === updatedItem._id ? updatedItem : item
  )
  setState({ specialties: updatedSpecialties })
}

export const deleteSpecialty = itemId => {
  const currentState = getState()
  const updatedSpecialties = currentState.specialties.filter(
    item => item._id !== itemId
  )
  setState({ specialties: updatedSpecialties })
}
