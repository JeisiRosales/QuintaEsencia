export interface HelpItem {
    id: string;
    title: string;
    content: React.ReactNode;
}

export interface HelpCategory {
    categoryName: string;
    items: HelpItem[];
}

export const helpDictionary: HelpCategory[] = [
    {
        categoryName: "Soporte",
        items: [
            {
                id: "como-comprar",
                title: "¿Cómo comprar?",
                content: (
                    <div className="space-y-4" >
                        <p>Realizar tu pedido en Quinta Esencia es un proceso diseñado para tu tranquilidad: </p>
                        < ol className="list-decimal pl-5 space-y-2" >
                            <li>Explora nuestra colección de botánica sagrada y selecciona tus alquimias.</li>
                            < li > Añade los productos al carrito.</li>
                            < li > Confirma tu pedido y serás redirigido a WhatsApp para finalizar el proceso con nosotros.</li>
                        </ol>
                    </div>
                )
            },
            {
                id: "metodo-pago",
                title: "Método de pago",
                content: (
                    <div className="space-y-4" >
                        <p>Para facilitar tu experiencia, aceptamos los siguientes métodos de pago: </p>
                        < ul className="list-disc pl-5 space-y-2" >
                            <li><strong>Transferencias Bancarias: </strong> Bancos nacionales.</li >
                            <li><strong>Pago Móvil: </strong> Procesamiento inmediato.</li >
                            <li><strong>Divisas Electrónicas: </strong> Binance.</li >
                        </ul>
                        < p className="text-sm italic mt-4" > Nota: Los datos exactos se proporcionarán luego de que envies tu pedido.</p>
                    </div>
                )
            },
            {
                id: "preguntas-frecuentes",
                title: "Preguntas Frecuentes",
                content: (
                    <div className="space-y-6" >
                        <div>
                            <h4 className="mb-1" >¿Los productos son 100 % naturales ? </h4>
                            < p > Sí.Trabajamos exclusivamente con botánica sagrada sin alteraciones químicas sintéticas.</p>
                        </div>
                        < div >
                            <h4 className="mb-1" >¿Cuánto dura un aceite intencionado ? </h4>
                            < p > Almacenados en un lugar fresco y lejos de la luz directa, pueden conservar sus propiedades óptimas entre 6 y 12 meses.</p>
                        </div>
                    </div>
                )
            }
        ]
    },
    {
        categoryName: "Envíos y Entregas",
        items: [
            {
                id: "entregas-personales",
                title: "Entregas Personales",
                content: (
                    <div className="space-y-4" >
                        <p>Realizamos entregas personales coordinadas en puntos céntricos y seguros, asegurando que tu producto llegue en perfectas condiciones.</p>
                    </div>
                )
            },
            {
                id: "envios-nacionales",
                title: "Envíos Nacionales",
                content: (
                    <div className="space-y-4" >
                        <p>Llevamos nuestra alquimia a cualquier rincón del país a través de empresas de encomienda reconocidas(MRW, Tealca, Zoom).</p>
                        < p > <strong>Tiempos de despacho: </strong> Los envíos se realizan los días martes y jueves. Recibirás tu número de guía una vez el paquete esté en tránsito.</p >
                    </div>
                )
            }
        ]
    }
];

