# Quinta Esencia - Plataforma Web

## Descripción
Este proyecto es el frontend de la plataforma Quinta Esencia. Es una aplicacion web moderna y rapida (SPA) construida para ofrecer una experiencia de usuario fluida, elegante e interactiva. Utiliza tecnologias de vanguardia para asegurar un rendimiento optimo y una gestion de contenido dinamica.

## Problema que resuelve
El proyecto web de Quinta Esencia proporciona la interfaz de usuario principal de la marca, permitiendo a los visitantes explorar la coleccion de productos, aprender sobre los rituales de cuidado, leer articulos en el blog y gestionar sus compras a traves de un carrito de compras integrado. Resuelve la necesidad de tener un escaparate digital atractivo, rapido y directamente conectado a un gestor de contenido (CMS) para actualizaciones en tiempo real.

## Estructura detallada de los directorios

A continuacion se detalla la estructura principal del proyecto, comenzando desde la carpeta raiz (`web/`):

```text
/web
  ├── /.tanstack        # Archivos generados automaticamente por TanStack Router
  ├── /dist             # Carpeta generada al hacer el build de produccion (codigo compilado y minificado)
  ├── /node_modules     # Dependencias de Node.js instaladas para el proyecto
  ├── /public           # Archivos estaticos publicos que no pasan por el bundler (favicon, etc.)
  ├── /src              # Directorio principal del codigo fuente de la aplicacion
  │   ├── /api          # Logica de conexion con servicios externos y peticiones de red (por ejemplo, Sanity CMS)
  │   ├── /assets       # Recursos estaticos procesados por Vite (imagenes, iconos, etc.)
  │   ├── /components   # Componentes de interfaz de usuario (UI) reutilizables en toda la aplicacion
  │   ├── /features     # Modulos especificos por funcionalidad (ej. cart para el carrito de compras, home para la pagina de inicio)
  │   ├── /hooks        # Custom hooks de React para logica de estado y efectos reutilizables
  │   ├── /lib          # Configuraciones de librerias de terceros y utilidades generales
  │   ├── /routes       # Estructura de rutas de la aplicacion utilizando TanStack Router
  │   ├── /types        # Definiciones de tipos e interfaces de TypeScript
  │   └── /utils        # Funciones auxiliares genericas y formateadores
  ├── .env.local        # Variables de entorno locales (no subidas al repositorio)
  ├── .gitignore        # Reglas de archivos ignorados por Git
  ├── eslint.config.js  # Configuracion de reglas de linting (ESLint) para mantener la calidad del codigo
  ├── index.html        # Punto de entrada HTML principal de la aplicacion
  ├── package.json      # Configuracion del proyecto npm, scripts y listado de dependencias
  ├── tsconfig.*.json   # Diferentes configuraciones de TypeScript (para la app, Node y general)
  └── vite.config.ts    # Configuracion del empaquetador de modulos Vite
```

## Requisitos Previos

Para ejecutar este proyecto de manera local, asegurate de tener instalado:
- **Node.js**: Version 18.0 o superior recomendada (preferiblemente v20 LTS).
- **npm**: Gestor de paquetes de Node (usualmente viene instalado junto con Node.js).
- **Git**: Para control de versiones.

## Variables de Entorno

El proyecto requiere ciertas variables de entorno para conectarse a servicios externos (Sanity CMS). Debes crear un archivo `.env.local` en la raiz del proyecto web basandote en el siguiente esquema:

```env
VITE_SANITY_PROJECT_ID=tu_project_id_aqui
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-03-01
```

## Como poner en marcha el proyecto

Sigue estos pasos para ejecutar el proyecto en tu maquina local. Estas instrucciones aplican para Windows, macOS y Linux. Puedes usar la terminal de tu preferencia (Bash, Zsh, PowerShell o Simbolo del sistema).

**Paso 1:** Abre tu terminal y navega hasta la carpeta del proyecto web.
*En Windows (PowerShell / CMD):*
```powershell
cd ruta\hacia\quinta-esencia\web
```
*En macOS / Linux (Bash / Zsh):*
```bash
cd ruta/hacia/quinta-esencia/web
```

**Paso 2:** Instala las dependencias del proyecto. Este comando es igual en cualquier sistema operativo.
```bash
npm install
```

**Paso 3:** Crea y configura el archivo de variables de entorno.
Crea un archivo llamado `.env.local` en la raiz de la carpeta `web` y añade las variables mencionadas en la seccion anterior.

**Paso 4:** Inicia el servidor de desarrollo. Este comando es igual en cualquier sistema operativo.
```bash
npm run dev
```

**Paso 5:** Abre la aplicacion.
Una vez que el servidor inicie, la terminal te indicara la URL local. Usualmente es `http://localhost:5173` o `http://localhost:3000`. Abre este enlace en tu navegador web.

## Notas y Decisiones Tecnicas Tomadas

- **Vite:** Se eligio Vite como bundler principal en lugar de Create React App o Webpack debido a su excepcional velocidad de inicio y su Hot Module Replacement (HMR) ultrarrapido, mejorando drasticamente la experiencia de desarrollo (DX).
- **React 19:** Se utiliza la ultima version de React para aprovechar las mejoras de rendimiento y las nuevas APIs concurrentes.
- **TanStack Router:** Implementado para el enrutamiento debido a que es un router de primer nivel con seguridad de tipos estricta (Type-Safe), lo que ayuda a prevenir errores de enlaces rotos y facilita el manejo de estado por URL.
- **Tailwind CSS v4:** Utilizado para el estilizado, permitiendo un desarrollo agil basado en utilidades de forma escalable sin salir del archivo TSX.
- **Zustand:** Seleccionado como manejador de estado global (utilizado en caracteristicas como el carrito de compras) por su simplicidad, sintaxis limpia sin boilerplate excesivo y excelente rendimiento comparado con Redux.
- **Framer Motion:** Integrado para las animaciones y micro-interacciones de la interfaz, aportando un diseno moderno, dinamico y premium a la experiencia del usuario.
- **Sanity CMS:** Como backend Headless CMS, permite al cliente gestionar su catalogo y blog de manera flexible, mientras el frontend consume los datos estructurados a traves de su cliente `@sanity/client`.

---

Firma del autor: Jeisi Rosales
