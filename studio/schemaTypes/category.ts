import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'category',
    title: 'Categorías (Líneas de Producto)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'URL (Slug)',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Descripción de la línea',
            type: 'text',
            rows: 2,
        }),
    ],
})