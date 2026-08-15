import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'product',
    title: 'Productos',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nombre del Producto',
            description: 'Ejemplo: Calma Álmica',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Enlace del Producto (URL)',
            description: 'Haz clic en "Generate" para crear el enlace automático basado en el nombre.',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Categoría',
            description: 'Selecciona a qué línea pertenece este producto.',
            type: 'string',
            options: {
                list: [
                    { title: 'Sales Alquímicas', value: 'sales-alquimicas' },
                ],
                layout: 'dropdown'
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'price',
            title: 'Precio ($)',
            description: 'Ejemplo: 2.99',
            type: 'number',
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'weight',
            title: 'Contenido Neto y Rendimiento',
            description: 'Ejemplo: 500g (Suficiente para 4 a 5 rituales)',
            type: 'string',
        }),
        defineField({
            name: 'shortDescription',
            title: 'Descripción Corta (Para el Inicio)',
            description: 'Texto breve que aparecerá en las tarjetas de la página principal. Máximo 2 o 3 líneas.',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required().max(160),
        }),
        defineField({
            name: 'tagline',
            title: 'Frase Gancho / Promesa Emocional',
            description: 'Ejemplo: "Un abrazo efervescente para aquietar el sistema nervioso."',
            type: 'string',
        }),
        defineField({
            name: 'sensoryProfile',
            title: 'Perfil Sensorial',
            description: 'Agrega palabras clave. Ejemplo: Floral, Terroso, Relajante',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'mainImage',
            title: 'Imagen Principal (Empaque)',
            description: 'La foto principal que se verá en la tarjeta y en el detalle.',
            type: 'image',
            options: {
                hotspot: true,
            }
        }),
        defineField({
            name: 'detailImages',
            title: 'Imágenes Adicionales (Opcional)',
            description: 'Fotos de la textura, acercamientos a los ingredientes, etc.',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
            name: 'description',
            title: 'Historia Detallada / El Propósito',
            description: 'Cuenta la historia del producto, su intención y qué hace por el cliente.',
            type: 'text',
            rows: 5,
        }),
        defineField({
            name: 'ingredients',
            title: 'Lista de Ingredientes y Beneficios',
            description: 'Añade los ingredientes clave y qué aportan al ritual.',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'name',
                            title: 'Nombre del Ingrediente',
                            type: 'string'
                        },
                        {
                            name: 'benefit',
                            title: 'Beneficio Principal',
                            type: 'text',
                            rows: 2
                        }
                    ],
                    preview: {
                        select: {
                            title: 'name',
                            subtitle: 'benefit'
                        }
                    }
                }
            ]
        }),
        defineField({
            name: 'ritualSteps',
            title: 'Pasos del Ritual (Instrucciones de uso)',
            description: 'Agrega uno a uno los pasos para que el cliente viva la experiencia.',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'isHandmade',
            title: '¿Hecho a mano en lotes pequeños?',
            description: 'Genera el sello de producto artesanal en la web.',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'isOrganic',
            title: '¿100% Botánico y Natural?',
            description: 'Genera el sello de producto puro en la web.',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'isFeatured',
            title: 'Destacar en la página de inicio',
            type: 'boolean',
            description: 'Activa esto para que aparezca en la sección principal (Máximo sugerido: 4 productos)',
            initialValue: false,
        })
    ],
    preview: {
        select: {
            title: 'name',
            media: 'mainImage',
            subtitle: 'price',
            category: 'category' // Agregamos la categoría para leerla
        },
        prepare(selection) {
            const { title, media, subtitle, category } = selection

            // Formatear el nombre de la categoría para que se vea bonita en el listado
            const categoryNames: Record<string, string> = {
                'sales-alquimicas': 'Sal Alquímica',
                'sales-efervescentes': 'Sal Efervescente',
                'aceites-botanicos': 'Aceite Botánico',
                'accesorios': 'Accesorio'
            }

            const displayCategory = category ? categoryNames[category] : 'Sin categoría'

            return {
                title: title,
                media: media,
                subtitle: `$${subtitle} | ${displayCategory}` // Ahora en la lista de Sanity verás "$2.99 | Sal Efervescente"
            }
        }
    }
})