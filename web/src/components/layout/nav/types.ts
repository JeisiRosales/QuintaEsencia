export interface Sublink {
    name: string
    slug: string // Slug de categoría, siempre es un string plano
}

export interface NavLink {
    name: string
    path: string
    sublinks?: Sublink[]
}
