# Changelog

## [No liberado]

### Cambiado
- **Inicio de sesión del panel admin** — Rediseñada la pantalla con identidad visual del portafolio, descripción del panel, formulario accesible y adaptación al alto disponible
  - Interfaz en español, botón para mostrar/ocultar contraseña y estados de carga y error más claros
  - Navbar simplificada con retorno al portafolio; se ocultan los controles globales de tema e idioma en rutas de administración

## [No liberado]

### Agregado
- **Acceso de administración en la navbar** — Ícono de escudo con usuario que enlaza al login del panel y muestra el tooltip «Gestión del admin»

### Cambiado
- **Navbar responsive** — Se conserva el espacio entre la marca y los enlaces; el acceso admin se ancla cerca del borde derecho sin alterar la distribución principal
- **Ícono de administración** — Escudo con usuario más visible, con mayor tamaño y un área de interacción clara
- **Navegación de escritorio** — Las etiquetas largas se ajustan dentro del espacio disponible sin invadir el acceso admin

## [No liberado]

### Agregado
- **Sección del plan de estudios** — Presentación breve de la carrera de Ingeniería en Sistemas después de los acordeones
  - Enlace al brochure PDF que abre el documento en una pestaña nueva
  - Texto localizado en español e inglés

## [No liberado]

### Cambiado
- **Edición de proyectos** — Reemplazado el campo de descripción de texto plano por el editor TipTap usado en el CMS del blog
  - Admite formato de texto, encabezados, listas, enlaces, alineación e imágenes
  - Las descripciones existentes en texto plano se cargan en el editor sin requerir migración de base de datos
  - El HTML se sanitiza en el servidor antes de guardarse y se muestra formateado en las tarjetas y el diálogo de detalles

## [No liberado]

### Agregado
- **Diálogo de detalles para proyectos** — Nuevo botón «Ver detalles» en las tarjetas de proyectos
  - Muestra la descripción completa, categoría y enlaces disponibles a la demo y GitHub
  - Galería interactiva con navegación, miniaturas y ampliación de imágenes
  - Etiquetas de interfaz accesibles y traducciones de español e inglés

### Cambiado
- **Tarjetas de proyectos** — Descripción resumida a tres líneas para evitar el desplazamiento dentro de la tarjeta
- **Acciones de proyectos** — Enlaces de demo y GitHub agrupados a la izquierda y botón de detalles alineado a la derecha
- **Visor de imágenes** — La ampliación ocupa el viewport y conserva la imagen completa sin recortes ni desplazamiento

### Corregido
- Apertura del diálogo de detalles en modo de desarrollo con React Strict Mode
- Cierre del visor ampliado y del diálogo con la tecla Escape

## [No liberado]

### Agregado
- **Migración a Vercel** — Hosting migrado de Netlify a Vercel
  - Proyecto: `marlongv-portfolio` → dominio `https://marlongv.vercel.app`
  - Variables de entorno configuradas en Vercel (Supabase, Firebase, Cloudinary)
  - Eliminada dependencia de `netlify.toml` para builds

## [No liberado]

### Agregado
- **Sistema i18n** — Internacionalización completa con 5 idiomas (EN, ES, FR, DE, RU)
  - Archivo de traducciones: `src/i18n/translations.ts` con todas las claves de texto UI
  - LanguageContext provider con persistencia en `localStorage`
  - Hook `useLanguage()` con función `t(key)` para traducciones
- **LanguageSwitcher** — Elemento UI flotante abajo a la derecha, posicionado arriba del ThemeMenu
  - Ícono de globo + etiqueta del idioma actual
  - Dropdown que se abre hacia arriba con las 5 opciones de idioma
  - Clic fuera para cerrar
- **Contenido de acordeones traducido** — Todos los títulos y descripciones de tarjetas de servicios y soporte técnico ahora son traducibles mediante claves i18n

### Cambiado
- **Navbar** — Eliminado `overflow-hidden` para permitir que los dropdowns se muestren correctamente; logo siempre visible (eliminado ocultamiento condicional al abrir menú mobile)
- **Footer** — Eliminada sección decorativa de selector de idioma; todo el texto (Resumen, descripción, Contáctenos, Ubicación, copyright) ahora usa traducciones i18n
- **Hero** — Saludo, roles, subtítulo y texto de botones ahora traducidos via i18n
- **Sección de Contacto** — Labels del formulario, placeholders, encabezados de sección y botón de descargar CV ahora traducidos
- **ProjectSection** — Convertido a `'use client'` para acceso a i18n
- **ServiceSection / ComputerSupportSection** — Convertidos a `'use client'`; fuente de texto movida de `appData` hardcodeado a claves de traducción i18n
- **`appData/index.ts`** — `serviceData` y `computerSupportData` reducidos a solo íconos; texto eliminado (ahora en traducciones)
- **ThemeMenu** — Texto `_select-theme` ahora traducible
- **DisclaimerBanner** — Eliminado del layout

### Corregido
- Dropdown del LanguageSwitcher estaba siendo recortado por `overflow-hidden` del Navbar
- Menú mobile ahora abre/cierra correctamente sin ocultar el logo
- Alineación del dropdown del LanguageSwitcher en mobile (ahora alineado a la izquierda con los items del menú)
- Visibilidad del ícono de globo al recargar página y al cambiar de idioma

### Deuda Técnica
- Todos los componentes servidor que renderizan texto traducible fueron convertidos a componentes cliente para acceder al hook `useLanguage()`
