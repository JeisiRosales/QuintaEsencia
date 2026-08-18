import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'intention',
    title: 'Intenciones (Propósitos)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Intención',
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
    ],
})