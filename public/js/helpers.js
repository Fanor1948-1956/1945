export function getStoredData (key, defaultValue = []) {
  return JSON.parse(localStorage.getItem(key)) || defaultValue
}

export function saveDataToLocalStorage (key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}
