import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'homeMessage',
    title: 'Mensajes del Alma',
    type: 'document',
    fields: [
        defineField({
            name: 'message',
            title: 'Mensaje',
            description: 'El texto del mensaje que aparecerá rotando en la página principal (máximo 130 caracteres).',
            type: 'text',
            rows: 4,
            // Al usar max(500), Sanity muestra automáticamente el contador en tiempo real en la pantalla
            validation: (Rule) => Rule.required().max(130).error('El mensaje no puede superar los 130 caracteres.'),
        }),
        defineField({
            name: 'signature',
            title: 'Firma / Despedida',
            description: 'Ejemplo: "— Con amor", "— Desde mi alma"',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'message',
            subtitle: 'signature'
        },
        prepare(selection) {
            const { title, subtitle } = selection

            const truncatedTitle = title && title.length > 50
                ? `${title.substring(0, 50)}...`
                : title

            return {
                title: truncatedTitle,
                subtitle: subtitle
            }
        }
    }
})