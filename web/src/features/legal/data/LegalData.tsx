import React from 'react';
import type { AccordionCategoryData } from '@/components/ui/accordion/types';

export const legalDictionary: AccordionCategoryData[] = [
    {
        categoryName: "Políticas de la Tienda",
        items: [
            {
                id: "devolucion",
                title: "Políticas de Devolución",
                content: (
                    <div className="space-y-8">
                        <section>
                            <h4 className="font-medium text-dark-1 mb-2">Condiciones de Higiene y Energía</h4>
                            <p>
                                En Quinta Esencia valoramos profundamente la pureza e integridad energética y física de nuestras alquimias.
                                Por la delicada naturaleza de nuestros productos botánicos y de cuidado personal, <strong>no aceptamos cambios ni devoluciones de frascos, mezclas o empaques que hayan sido abiertos, usados o manipulados</strong> por el cliente.
                            </p>
                        </section>

                        <section>
                            <h4 className="font-medium text-dark-1 mb-2">Reclamos por Envíos</h4>
                            <p className="mb-3">
                                Empacamos cada pedido con extremo cuidado. Sin embargo, si al recibir tu paquete por parte de la agencia de encomiendas notas que algún producto ha llegado derramado o roto:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mb-3">
                                <li>Notifícanos a través de nuestro WhatsApp <strong>el mismo día de la recepción</strong> del paquete.</li>
                                <li>Adjunta fotografías claras del estado en que llegó el empaque y el producto afectado.</li>
                            </ul>
                            <p>
                                Nuestro equipo evaluará tu caso de manera oportuna y conversaremos contigo para ofrecerte una solución justa.
                            </p>
                        </section>

                        <section>
                            <h4 className="font-medium text-dark-1 mb-2">Errores en el Pedido</h4>
                            <p>
                                Si por algún motivo recibes una alquimia o producto distinto al que solicitaste, por favor contáctanos de inmediato por WhatsApp.
                                Asumiremos la responsabilidad del error y coordinaremos contigo el cambio correspondiente a la mayor brevedad, garantizando que recibas lo que tu alma eligió.
                            </p>
                        </section>
                    </div>
                )
            },
            {
                id: "terminos",
                title: "Términos y Condiciones",
                content: (
                    <div className="space-y-8">
                        <section>
                            <h4 className="font-medium text-dark-1 mb-2">Naturaleza del Sitio</h4>
                            <p>
                                El sitio web de Quinta Esencia funciona exclusivamente como un catálogo informativo y un espacio para exponer nuestras alquimias botánicas.
                                <strong> Ninguna transacción monetaria o pago se realiza dentro de esta plataforma.</strong>
                            </p>
                        </section>

                        <section>
                            <h4 className="font-medium text-dark-1 mb-2">Proceso de Compra</h4>
                            <p className="mb-3">
                                Al seleccionar un producto y hacer clic en "Comprar" o "Contactar", serás redirigido a nuestro chat oficial de WhatsApp.
                                Es a través de este canal de atención personalizada donde nuestro equipo te asistirá para:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Confirmar la disponibilidad real del producto.</li>
                                <li>Coordinar los métodos de pago aceptados.</li>
                                <li>Acordar los detalles de envío o entrega personal.</li>
                            </ul>
                        </section>

                        <section>
                            <h4 className="font-medium text-dark-1 mb-2">Descargo de Responsabilidad</h4>
                            <p className="mb-3">
                                Nuestras creaciones botánicas, aceites intencionados y rituales están elaborados con un enfoque en el bienestar holístico y energético.
                            </p>
                            <p>
                                Es importante comprender que <strong>ninguno de nuestros productos promete curas médicas ni sustituye tratamientos, terapias o la atención de profesionales de la salud física o psicológica.</strong> Su propósito es acompañar tu intención y ayudarte a crear espacios de sanación personal.
                            </p>
                        </section>

                        <section>
                            <h4 className="font-medium text-dark-1 mb-2">Propiedad Intelectual</h4>
                            <p>
                                Todo el contenido expuesto en este sitio web, incluyendo textos explicativos, descripciones de productos, fotografías, logotipo e identidad visual, es propiedad exclusiva de Quinta Esencia y está protegido por las leyes de propiedad intelectual correspondientes. Su uso, reproducción o distribución sin nuestra autorización expresa está prohibido.
                            </p>
                        </section>
                    </div>
                )
            },
            {
                id: "privacidad",
                title: "Políticas de Privacidad",
                content: (
                    <div className="space-y-8">
                        <section>
                            <h4 className="font-medium text-dark-1 mb-2">Navegación en el Sitio Web</h4>
                            <p>
                                Tu tranquilidad es prioridad. Mientras navegas y exploras nuestro catálogo en la página web de Quinta Esencia, <strong>no recopilamos tu información personal, no solicitamos creación de cuentas ni almacenamos datos financieros</strong> o de tarjetas de crédito de ninguna forma.
                            </p>
                        </section>

                        <section>
                            <h4 className="font-medium text-dark-1 mb-2">Uso de Enlaces Externos</h4>
                            <p className="mb-3">
                                Para concretar tu pedido o atender tus consultas, nuestro sitio utiliza enlaces que te redirigirán a nuestra cuenta corporativa de WhatsApp.
                            </p>
                            <p>
                                Al hacer clic en estos enlaces y salir de nuestra web, tu navegación e interacción quedarán sujetas a los Términos de Servicio y Políticas de Privacidad propios de la plataforma WhatsApp (Meta).
                            </p>
                        </section>

                        <section>
                            <h4 className="font-medium text-dark-1 mb-2">Manejo de Datos en el Chat</h4>
                            <p className="mb-3">
                                Sabemos que la confianza es clave. Cualquier información que decidas compartirnos de forma privada durante nuestra conversación por WhatsApp (como tu nombre, número de cédula para encomiendas, dirección de entrega o comprobantes de pago) será tratada con el mayor de los respetos.
                            </p>
                            <p>
                                Dichos datos serán utilizados <strong>única y exclusivamente para procesar, organizar y despachar tu pedido</strong>, garantizando su absoluta confidencialidad y asegurando que tu experiencia de compra sea tan serena como nuestros rituales.
                            </p>
                        </section>
                    </div>
                )
            }
        ]
    }
];