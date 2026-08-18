import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'homeMessage',
    title: 'Mensajes del Alma',
    type: 'document',
    fields: [
        defineField({
            name: 'message',
            title: 'Mensaje',
            type: 'text',
            rows: 4,
            validation: (Rule) => Rule.required().max(130).error('El mensaje no puede superar los 130 caracteres.'),
        }),
        defineField({
            name: 'signature',
            title: 'Firma / Despedida',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
    ],
})