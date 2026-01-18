# 💬 SageChat

Una aplicación de chat moderna y elegante construida con React, TypeScript y Firebase, con un hermoso diseño en tonos sage green.

![SageChat](https://img.shields.io/badge/Version-0.0.1-5E8175?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-12.8.0-FFCA28?style=for-the-badge&logo=firebase)

## ✨ Características

- 🔐 **Autenticación con Google** - Login seguro usando Firebase Authentication
- 💬 **Chat en tiempo real** - Mensajería instantánea con Firestore
- 🎨 **Diseño elegante** - UI moderna con paleta de colores sage green
- 📱 **Responsive** - Adaptado para móviles, tablets y desktop
- ⚡ **Rápido** - Construido con Vite para desarrollo y compilación ultrarrápida
- 🎯 **Type-safe** - TypeScript para un código más robusto y mantenible

## 🎨 Paleta de Colores

```css
Primary: #5E8175     /* Dark Sage */
Secondary: #9FBDAF   /* Medium Sage */
Accent: #D2E4DD      /* Light Sage */
Background: #F3F9F6  /* Soft Mint */
Sidebar: #EBF5F1     /* Light Mint */
```

## 🚀 Inicio Rápido

### Prerequisitos

- Node.js 18+ 
- npm o yarn
- Cuenta de Firebase

### Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tuusuario/sagechat.git
   cd sagechat
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura Firebase**
   
   Crea un archivo `.env` en la raíz del proyecto:
   ```env
   VITE_FIREBASE_API_KEY=tu_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
   VITE_FIREBASE_PROJECT_ID=tu_project_id
   VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
   VITE_FIREBASE_APP_ID=tu_app_id
   ```

4. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador en** `http://localhost:5173`

## 📦 Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Compila la aplicación para producción
npm run preview  # Previsualiza la build de producción
npm run lint     # Ejecuta el linter
```

## 🛠️ Tecnologías

### Frontend
- **React 19.2.0** - Biblioteca de UI
- **TypeScript 5.9.3** - Tipado estático
- **Vite 7.2.4** - Build tool y dev server
- **Tailwind CSS 4.1.18** - Framework de CSS utility-first
- **React Router 7.12.0** - Enrutamiento

### Backend & Servicios
- **Firebase 12.8.0**
  - Authentication - Autenticación con Google
  - Firestore - Base de datos en tiempo real
  - Hosting - Despliegue de la aplicación

### Utilidades
- **react-firebase-hooks** - Hooks para Firebase
- **Material Icons** - Iconografía

## 📁 Estructura del Proyecto

```
sagechat/
├── public/              # Archivos estáticos
├── src/
│   ├── assets/         # Imágenes y recursos
│   ├── components/     # Componentes de React
│   │   ├── Chat.tsx           # Componente principal del chat
│   │   ├── Login.tsx          # Pantalla de login
│   │   ├── Logout.tsx         # Componente de logout
│   │   ├── Message.tsx        # Área de mensajes
│   │   ├── PanelUsers.tsx     # Panel lateral de usuarios
│   │   └── SendMessages.tsx   # Formulario de envío
│   ├── services/       # Servicios (Firebase config)
│   ├── types/          # Tipos de TypeScript
│   ├── App.tsx         # Componente raíz
│   ├── main.tsx        # Punto de entrada
│   └── index.css       # Estilos globales
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎯 Características Principales

### Autenticación
- Login con cuenta de Google mediante Firebase Authentication
- Redirección automática basada en el estado de autenticación
- Persistencia de sesión

### Panel de Usuarios
- Lista de conversaciones con estado (activo/inactivo)
- Sección de conversaciones fijadas
- Búsqueda de mensajes
- Perfil de usuario con estado en línea

### Área de Chat
- Interfaz limpia y moderna
- Barra de herramientas (llamada, videollamada, más opciones)
- Área de mensajes con scroll
- Input de mensaje con opciones de adjuntos y emojis
- Indicador de "escribiendo..."

## 🎨 Personalización

### Colores

Los colores están definidos en `src/index.css` usando custom properties de CSS:

```css
@theme {
  --color-primary: #5E8175;
  --color-secondary: #9FBDAF;
  --color-accent: #D2E4DD;
  --color-background-light: #F3F9F6;
  --color-sidebar-light: #EBF5F1;
}
```

### Fuentes

El proyecto usa **Inter** de Google Fonts. Puedes cambiarla en `index.html` y `index.css`.



## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@Andres-cmk](https://github.com/Andres-cmk/)

## <img width="512" height="512" alt="image" src="https://github.com/user-attachments/assets/1e18db09-a8a9-4e22-b785-4249791e61f6" />
 Mockups

   <img width="1018" height="813" alt="image" src="https://github.com/user-attachments/assets/8eb8fad9-8bab-4002-80af-32d2be9d478a" />
   <img width="1016" height="812" alt="image" src="https://github.com/user-attachments/assets/de300bf5-dcdf-4028-bd36-41fba4ad0bc0" />




---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!
import reactDom from 'eslint-plugin-react-dom'
