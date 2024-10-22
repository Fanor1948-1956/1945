



socket.addEventListener('open', () => {
  console.log('Conectado al servidor WebSocket')
})

socket.addEventListener('message', event => {
  if (event.data === 'actualizar') {
    console.log('Actualizando la página...')

    const loadingDiv = document.createElement('div')
    loadingDiv.id = 'loadingMessage'
    loadingDiv.style.position = 'fixed'
    loadingDiv.style.top = '50%'
    loadingDiv.style.left = '50%'
    loadingDiv.style.transform = 'translate(-50%, -50%)'
    loadingDiv.style.opacity = '0'
    loadingDiv.style.transition = 'opacity 0.5s'
    document.body.appendChild(loadingDiv)

    setTimeout(() => {
      loadingDiv.style.opacity = '0'
    }, 500)

    setTimeout(() => {
      location.reload()
    }, 500)
  }
})

socket.addEventListener('error', error => {
  console.error('Error en la conexión WebSocket:', error)
})


socket.addEventListener('close', () => {
  console.log('Conexión cerrada')
})
