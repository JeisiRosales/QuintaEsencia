import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'home',
    title: 'Página de Inicio',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título Interno',
            type: 'string',
            description: 'Solo para identificar este documento (ej: "Configuración del Home").',
            initialValue: 'Configuración del Home',
            readOnly: true,
        }),
        defineField({
            name: 'featuredProducts',
            title: 'Alquimias Destacadas',
            description: 'Selecciona y ordena los productos que aparecerán en la portada de la botica (Máximo 4).',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'product' }] }],
            validation: (Rule) => Rule.max(4).unique(),
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Configuración de la Página de Inicio',
            }
        },
    },
})