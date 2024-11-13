// theme.js
export function applyTheme () {
  const theme = localStorage.getItem('theme') || 'light' // Tema por defecto
  document.body.className = theme // Aplicar clase al body
}

export function toggleTheme () {
  const currentTheme = localStorage.getItem('theme')
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark' // Alternar entre light y dark
  localStorage.setItem('theme', newTheme) // Guardar el nuevo tema
  applyTheme() // Aplicar el nuevo tema
}
