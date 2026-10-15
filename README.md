# Portafolio personal de Marlon Gutiérrez

Portafolio web personal con un sistema de administración para gestionar proyectos, habilidades, secciones, traducciones y publicaciones del blog. La aplicación está construida con Next.js, React y TypeScript; Supabase sirve como base de datos y plataforma de autenticación.

## Tecnologías

- Next.js 16 y React 19
- TypeScript con modo estricto
- Tailwind CSS 4
- Supabase: PostgreSQL, autenticación, políticas RLS y actualizaciones en tiempo real
- Cloudinary para las imágenes administradas desde el panel
- Resend para notificaciones por correo del formulario de contacto
- Gemini API para asistencia opcional al redactar y traducir publicaciones

## Funcionalidades

- Portafolio adaptable con secciones de presentación, habilidades, proyectos, servicios, soporte técnico y contacto.
- Contenido dinámico administrable desde Supabase y el panel privado `/admin`.
- Panel de administración para proyectos, habilidades, íconos, secciones, traducciones, testimonios, ajustes y publicaciones.
- Blog con editor enriquecido, borradores, publicaciones, categorías, etiquetas, traducciones al español e inglés, RSS y conteo de vistas.
- Interfaz disponible en español, inglés, francés, alemán y ruso; el contenido del blog admite español e inglés.
- Cuatro temas visuales y preferencias de presentación configurables desde el panel.
- Carga de imágenes a Cloudinary y galería de imágenes para proyectos.
- Actualizaciones en tiempo real de contenido compatible cuando Realtime está habilitado en Supabase.
- SEO con metadata, datos estructurados, sitemap, robots.txt y tarjetas para redes sociales.

## Requisitos

- Node.js 22 o posterior.
- npm.
- Un proyecto de Supabase para usar el contenido dinámico y el panel de administración.

## Instalación y configuración

1. Clona este repositorio e instala las dependencias:

   ```bash
   npm install
   ```

2. Crea un archivo `.env.local` en la raíz del proyecto. Configura como mínimo:

   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_SUPABASE_URL=https://TU_PROYECTO.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_CLAVE_ANON
   SUPABASE_SERVICE_ROLE_KEY=TU_CLAVE_SERVICE_ROLE
   ```

   Las claves de Supabase se encuentran en la configuración del proyecto. La clave `SUPABASE_SERVICE_ROLE_KEY` es privada: no la expongas en el navegador ni la agregues al repositorio.

3. Configura la base de datos:

   - Abre el SQL Editor de tu proyecto Supabase.
   - Ejecuta, en orden numérico, los archivos de `supabase/migrations/`.
   - Crea el usuario administrador desde Authentication en Supabase.
   - Revisa que las tablas y políticas RLS de las migraciones estén aplicadas.
   - Para que los cambios se propaguen en tiempo real, habilita la publicación `supabase_realtime` para las tablas indicadas en las migraciones.

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   Abre `http://localhost:3000`. El panel administrativo está en `/admin/login`.

## Variables de entorno

| Variable | Requerida | Uso |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Sí para despliegue | URL pública del sitio; en desarrollo puede ser `http://localhost:3000`. Se usa para metadata, SEO y enlaces del blog. |
| `NEXT_PUBLIC_SUPABASE_URL` | Sí | URL del proyecto Supabase. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Sí | Clave pública anon de Supabase, restringida por las políticas RLS. |
| `SUPABASE_SERVICE_ROLE_KEY` | Sí para operaciones administrativas | Clave privada usada en el servidor para operaciones privilegiadas. Nunca debe llevar el prefijo `NEXT_PUBLIC_`. |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Opcional | Nombre de la nube de Cloudinary para la carga de imágenes. |
| `CLOUDINARY_API_KEY` | Opcional | Clave de API de Cloudinary, requerida para las cargas firmadas. |
| `CLOUDINARY_API_SECRET` | Opcional | Secreto de Cloudinary; mantenerlo únicamente en el servidor. |
| `RESEND_API_KEY` | Opcional | Activa el envío de notificaciones del formulario de contacto. |
| `CONTACT_EMAIL` | Opcional | Dirección que recibe las notificaciones enviadas mediante Resend. |
| `AI_GEMINI_API_KEY` | Opcional | Activa las herramientas de generación y traducción asistidas por IA del editor del blog. |
| `AI_MODEL` | Opcional | Modelo Gemini que se intenta primero; si no se define, se usa `gemini-flash-latest`. |

Cloudinary, Resend y Gemini son integraciones opcionales. Sin configurar Resend, los mensajes de contacto siguen guardándose en Supabase, pero no se envía el correo de notificación. Las funciones que dependen de Cloudinary o Gemini requieren sus respectivas credenciales.

## Comandos

```bash
npm run dev     # Servidor local con Turbopack
npm run lint    # ESLint
npm run build   # Build de producción
npm run start   # Servidor de producción local
```

## Panel de administración

Inicia sesión en `/admin/login` con un usuario creado en Supabase Authentication. Desde `/admin` puedes gestionar:

- Proyectos, imágenes de portada y galerías.
- Habilidades, íconos y orden de visualización.
- Secciones e ítems de servicios y soporte técnico.
- Testimonios, traducciones y ajustes del sitio.
- Publicaciones del blog, categorías y contenido traducido.

El acceso a los datos está controlado por las políticas RLS de Supabase. Aplica las migraciones del repositorio antes de usar el panel.

## Estructura del proyecto

```text
content/                  Datos JSON de referencia
docs/                     Guías y documentación técnica
src/
  actions/                Server Actions y acceso a datos
  app/                    Rutas de Next.js, API, blog y administración
  appData/                Datos de presentación del sitio
  components/             Componentes de interfaz organizados por sección
  context/                Contextos de idioma y visibilidad de secciones
  i18n/                   Traducciones de la interfaz
  lib/                    Clientes e integraciones de servidor
  services/               Servicios de acceso a contenido
  utils/                  Utilidades compartidas
supabase/
  migrations/             Esquema, políticas y configuración de la base de datos
```

El contenido principal en producción se obtiene de Supabase. Los archivos JSON de `content/` se conservan como datos de referencia y no reemplazan la configuración de la base de datos.

## Despliegue

El proyecto puede desplegarse en una plataforma compatible con Next.js. Antes de publicar:

1. Configura en el proveedor las variables de entorno requeridas para producción.
2. Define `NEXT_PUBLIC_SITE_URL` con el dominio público definitivo.
3. Aplica las migraciones de Supabase y crea el usuario administrador.
4. Añade las credenciales de Cloudinary, Resend o Gemini solo si vas a habilitar esas integraciones.
5. Ejecuta `npm run build` para verificar el build de producción.

No compartas ni subas al repositorio claves privadas, archivos `.env.local` o credenciales de servicio.

## Proyecto original

Este proyecto se inició como un fork de [AbdulBasit313/nextjs-portfolio-template](https://github.com/AbdulBasit313/nextjs-portfolio-template).
