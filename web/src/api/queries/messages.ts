// Obtiene los mensajes cortos o anuncios para mostrar en la página de inicio
export const HOME_MESSAGES_QUERY = `
  *[_type == "homeMessage"] | order(_createdAt desc) {
    _id,
    message,
    signature
  }
`
