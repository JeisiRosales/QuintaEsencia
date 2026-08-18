import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'article',
    title: 'Artículos del Blog',
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
            name: 'mainImage',
            title: 'Imagen de Portada',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'excerpt',
            title: 'Extracto Breve',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required().max(200),
        }),
        defineField({
            name: 'content',
            title: 'Contenido',
            type: 'array',
            of: [{ type: 'block' }, { type: 'image' }],
        }),
        defineField({
            name: 'intentions',
            title: 'Intenciones Relacionadas',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'intention' }] }],
        }),
        defineField({
            name: 'recommendedProducts',
            title: 'Productos Recomendados (Tarjetas Editoriales)',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'product' }] }],
        }),
    ],
})