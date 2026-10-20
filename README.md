# WhatsApp Web Clone — Trabajo Final Frontend

Clon de la interfaz de WhatsApp Web construido con **React** y **react-router**, como trabajo final de la materia. La aplicación permite ver una lista de contactos, abrir una conversación, buscar contactos, filtrar los que tienen mensajes sin leer y enviar mensajes nuevos.

## Desafío elegido

Recrear la experiencia de **WhatsApp Web** (lista de chats + pantalla de conversación) poniendo el foco en:

- Un layout tipo "dos paneles" en escritorio y "una sola vista" en mobile.
- Navegación entre pantallas con **react-router** (login, home, detalle de contacto y 404).
- Manejo de estado global con **Context API** (tema claro/oscuro y contactos/mensajes). El proyecto también incluye `LangContext` como base para una futura internacionalización.
- Formularios controlados (login y envío de mensajes).
- Separación de la lógica en **custom hooks**.
- Uso de **parámetros de ruta** (`:contact_id`) y **parámetros de búsqueda** (`?filter=unread`) de react-router.

## Cómo ejecutarlo

```bash
npm install
npm run dev      # servidor de desarrollo (abre el navegador)
npm run build    # build de producción
npm run preview  # sirve el build
npm run lint     # análisis estático con ESLint
```

## Funcionalidades

- **Login** (`/login`): formulario controlado con validación básica; al enviar navega al home.
- **Lista de contactos** (`/` y `/home`): muestra contactos con último mensaje, fecha y badge de no leídos.
- **Búsqueda** de contactos por nombre (estado local).
- **Filtro "Sin leer"**: usa el parámetro de búsqueda de la URL `?filter=unread` mediante `useSearchParams`, por lo que el filtro es compartible por link.
- **Detalle de conversación** (`/contact/:contact_id`): usa el parámetro de ruta `contact_id` (`useParams`).
- **Envío de mensajes**: barra de escritura con botón de palomita; el mensaje se agrega con la hora actual y el estilo de mensaje propio (burbuja verde a la derecha). También se puede enviar con **Enter**.
- **Marcado como leído**: al abrir un chat, sus mensajes sin leer pasan a leídos y desaparece el badge verde.
- **Menú de configuración** (ícono de 3 puntos junto al logo): despliega un panel debajo del ícono con dos acciones:
  - **Tema**: alterna entre modo claro y **modo oscuro** en toda la interfaz (el verde pasa a `rgb(16, 62, 44)` y las superficies blancas a `rgb(22, 23, 23)`).
  - **Marcar todos como leídos**: marca como leídos los mensajes de todos los chats y quita todos los badges.
- **Búsqueda de mensajes** dentro de la conversación (lupa del header): marca las coincidencias y las resalta temporalmente con una barra; si no hay coincidencias muestra "No se encontró ningún mensaje.".
- **Info. del contacto**: al tocar el avatar o el nombre en el header del chat se abre un panel a la derecha que ocupa casi la mitad del chat (un poco menos; el chat se adapta). Muestra la **foto en grande**, el **teléfono** y tres accesos en píldora: **Llamada**, **Video** y **Buscar** (este último abre la búsqueda de mensajes). Con el ícono de **lápiz** se pasa a la vista **"Edita el contacto"**: permite editar **Nombre**, **apellido** (se concatena al final del nombre, separado por un espacio) y **Teléfono** (solo admite números y el formato `+54 9 11 0245-4520`). Los cambios se reflejan al instante en el header y en la lista, pero no se persisten: al recargar vuelven al valor asignado. Cada contacto tiene un teléfono aleatorio fijo.
- **Auto-scroll** al último mensaje al abrir el chat o al enviar.
- **404** (`*`): pantalla de ruta no encontrada.
- **Responsive**: se adapta de **320px a 2000px** (y más), sin scroll horizontal.
- **Accesibilidad visual**: la paleta se ajustó para que todos los textos, badges y botones superen el contraste mínimo **WCAG AA** (4.5:1 para texto normal) tanto en tema claro como oscuro. Incluye foco visible con teclado en los controles principales.

## Librerías usadas

Dependencias de producción:

- **react** `^19.2.8` — librería de UI.
- **react-dom** `^19.2.8` — renderizado en el DOM.
- **react-router** `^8.5.0` — enrutamiento (`BrowserRouter`, `Routes`, `Route`, `Link`, `useParams`, `useNavigate`, `useSearchParams`).

Dependencias de desarrollo:

- **vite** `^8.3.0` — bundler y dev server.
- **@vitejs/plugin-react** `^6.1.1` — Fast Refresh / JSX.
- **eslint** `^10.10.0` + **@eslint/js** + **eslint-plugin-react-hooks** `^7.1.1` + **eslint-plugin-react-refresh** + **globals** — linting.
- **@types/react** / **@types/react-dom** — tipos.

> Nota: el proyecto no usa librerías de estilos (Tailwind, styled-components, etc.); el CSS es propio con variables en `src/global.css`.

## Estructura del proyecto

```
src/
├── Components/
│   ├── ContactInfo/      # Panel Info. del contacto + edición
│   ├── ContactOption/    # Fila de un contacto en la lista
│   ├── ContactsList/     # Lista + búsqueda + filtro
│   ├── LangSelect/       # Selector de idioma
│   ├── LoginForm/        # Formulario de login
│   ├── Message/          # Burbuja de mensaje
│   ├── MessageInput/     # Barra de escritura + envío
│   ├── MessageSearch/    # Panel de búsqueda de mensajes
│   ├── SettingsMenu/     # Ícono de 3 puntos + menú (tema / marcar leídos)
│   └── Sidebar/          # Barra lateral
├── Context/
│   ├── ContactContext.jsx  # Contactos, mensajes, no leídos, enviar
│   ├── LangContext.jsx     # Idioma
│   └── ThemeContext.jsx    # Tema claro/oscuro
├── Screens/
│   ├── ContactDetailScreen/
│   ├── HomeScreen/
│   ├── LoginScreen/
│   └── NotFoundScreen/
├── data/contact-data-mook.js  # Datos mock
├── hooks/
│   ├── useContactSearch.jsx   # Búsqueda por texto
│   ├── useLogin.jsx           # Lógica del formulario de login
│   ├── useMessageSearch.jsx   # Búsqueda/resaltado de mensajes
│   └── useUnreadFilter.jsx    # Filtro por URL (?filter=unread)
├── utils/
│   ├── formatActivity.js      # Estado "en línea" / última conexión
│   ├── formatDate.js          # Formateo de fechas relativas
│   └── normalizeText.js       # Normalización (mayúsculas/acentos)
├── App.jsx
├── main.jsx
└── global.css
```

## Consigna cumplida

| Requisito | Dónde se cumple |
| --- | --- |
| README con descripción, librerías y dificultades | Este archivo |
| Responsive de 320px a 2000px | `global.css` + CSS de componentes (media queries) |
| Estilos accesibles (contraste WCAG AA) | Variables de color en `global.css`; verificado en tema claro y oscuro |
| Desarrollado en React | React 19 |
| Uso de estados | `useState` en contextos y hooks |
| Uso de contextos | `ThemeContext`, `LangContext`, `ContactContext` |
| Enrutamiento con react-router | `main.jsx` y `App.jsx` |
| Al menos 1 formulario | `LoginForm` y `MessageInput` |
| Custom hooks para separar lógica | `useLogin`, `useContactSearch`, `useUnreadFilter` |
| Uso de componentes | Carpeta `Components/` |
| Al menos 2 páginas en el flujo | `LoginScreen`, `HomeScreen`, `ContactDetailScreen`, `NotFoundScreen` |
| Al menos una página usando parámetros de búsqueda | Filtro `?filter=unread` con `useSearchParams` en `useUnreadFilter` |

## Dificultades presentadas

- **Página en blanco que el build no detectaba**: `main.jsx` usaba `<BrowserRouter>` y `App.jsx` usaba `useContext` sin importarlos. `vite build` compila igual porque son errores de *runtime* (`ReferenceError`), así que la app montaba "en blanco" sin avisar. Se detectó leyendo los imports y se corrigió.
- **Conflicto de orden/especificidad del CSS**: las media queries responsivas de clases definidas en `Sidebar.css`, `ContactOption.css` y `Message.css` estaban en `global.css`, que se carga antes; las reglas base (posteriores) las pisaban. Se movió cada regla responsiva junto a su definición base.
- **Bug de layout a ≤480px**: `.contenido-principal { padding: 16px }` tenía la misma especificidad que `.contact-detail { padding: 0 }` y lo pisaba, dejando la conversación "encajonada". Se resolvió con `.contenido-principal:not(.contact-detail)`.
- **Layout de dos paneles vs. una vista en mobile**: se resolvió con clases modificadoras (`home-screen--list` / `home-screen--detail`) y media queries, agregando un botón "Volver" visible en mobile.
- **Marcar como leído sin `useEffect`**: React Hooks v7 (`eslint-plugin-react-hooks`) marca como error llamar a `setState` dentro de un `useEffect` (renders en cascada). Se resolvió marcando el contacto como leído en el `onClick` del link y también en el estado inicial del provider para el ingreso directo por URL.
- **Distinguir "parámetros de ruta" de "parámetros de búsqueda"**: el detalle usa `useParams` (un segmento de la URL), pero la consigna pedía *search params*; se agregó `useSearchParams` para el filtro `?filter=unread`.
- **Datos mock en memoria**: como no hay backend, los cambios (mensajes enviados y estado de leído) se pierden al recargar la página. Se puede extender guardando en `localStorage`.
- **Tema oscuro sin tocar cada componente**: los colores base son variables CSS, pero varios componentes tenían colores fijos (`#ffffff`, `#d9fdd3`, `#efeae2`, `#111b21`). Se resolvió con un bloque `[data-theme="dark"]` en `global.css` que sobreescribe los casos necesarios usando mayor especificidad, sin duplicar reglas responsivas. Además, el tema se aplica en `<html data-theme>` desde `ThemeContext`, así que cubre todas las pantallas.
- **Contraste insuficiente en la paleta original**: los colores típicos de WhatsApp no cumplían WCAG AA en el tema claro (por ejemplo, blanco sobre `#00a884` daba 3.03:1 y el badge `#25d366` solo 1.98:1). Se ajustó el verde principal a `#0a7a63`, el badge a `#0e7a5f`, el texto secundario a `#5b6b74` y las palomitas a tonos más oscuros; en tema oscuro se aclararon las horas y las palomitas. Luego se verificó con una auditoría automática de contraste sobre todas las pantallas y paneles en ambos temas.

## Próximos pasos posibles

- Persistir contactos, mensajes y el tema elegido en `localStorage`.
- Traducir la interfaz según el idioma seleccionado (`LangContext`).
- Ordenar la lista de contactos por fecha del último mensaje.
