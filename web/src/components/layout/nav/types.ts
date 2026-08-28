export interface Sublink {
    name: string
    slug: string // Slug de categoría, siempre es un string plano
    id?: string  // _id de Sanity — usado para el query param ?category= en /coleccion
}

export interface NavLink {
    name: string
    path: string
    sublinks?: Sublink[]
}
