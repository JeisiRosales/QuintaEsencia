import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'ingredient',
    title: 'Ingredientes Botánicos',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nombre',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'benefit',
            title: 'Beneficio Principal',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required(),
        }),
    ],
})