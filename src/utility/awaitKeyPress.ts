export const SpaceKey = 'Space'
export const BKey = 'KeyB'
export const awaitKeyPress = (key: string) => {
  const controller = new AbortController();
  const { signal } = controller;

  return new Promise<void>(resolve => {
    const spaceKeydownHandler = (event) => {
      if (event.code === key) {
        event.preventDefault();
        console.log(`${key} pressed`)
        controller.abort()
        resolve()
      }
    }
    document.addEventListener('keydown', spaceKeydownHandler, {signal});
  })

  // Listener para la tecla Espacio
}