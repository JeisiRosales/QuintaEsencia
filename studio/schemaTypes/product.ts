import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'product',
    title: 'Productos',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nombre del Producto',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Enlace del Producto (URL)',
            type: 'slug',
            options: { source: 'name', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Categoría Principal',
            type: 'reference',
            to: [{ type: 'category' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'intentions',
            title: 'Intenciones / Propósitos',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'intention' }] }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'price',
            title: 'Precio ($)',
            type: 'number',
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'weight',
            title: 'Contenido Neto',
            type: 'string',
        }),
        defineField({
            name: 'shortDescription',
            title: 'Descripción Corta',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required().max(160),
        }),
        defineField({
            name: 'tagline',
            title: 'Frase Gancho',
            type: 'string',
        }),
        defineField({
            name: 'mainImage',
            title: 'Imagen Principal',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'detailImages',
            title: 'Imágenes Adicionales',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
            name: 'description',
            title: 'Historia / Propósito',
            type: 'text',
            rows: 5,
        }),
        defineField({
            name: 'ingredients',
            title: 'Ingredientes',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'ingredient' }] }],
        }),
        defineField({
            name: 'ritualSteps',
            title: 'Pasos del Ritual',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'isHandmade',
            title: 'Hecho a mano',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'isOrganic',
            title: '100% Botánico',
            type: 'boolean',
            initialValue: true,
        })
    ],
})