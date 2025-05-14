# React + Vite

# Travel Tracker

Aplicación web para planificar y gestionar viajes. Permite crear viajes, agregar ciudades, y compartir con otros viajeros.

## Características

- Autenticación con Google
- Creación y gestión de viajes
- Agregar ciudades y actividades
- Interfaz responsive
- Compartir viajes con otros usuarios

## Tecnologías

- React
- Firebase (Auth, Firestore, Hosting)
- Vite
- CSS Modules

## Desarrollo Local

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd travel-tracker
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## Despliegue

### Prerrequisitos

1. Tener una cuenta de Google y un proyecto en Firebase
2. Tener instalado Node.js y npm
3. Tener instalado Firebase CLI:
```bash
npm install -g firebase-tools
```

### Pasos para el Despliegue

1. Inicia sesión en Firebase:
```bash
firebase login
```

2. Inicializa Firebase en tu proyecto (si no lo has hecho):
```bash
firebase init
```
Selecciona:
- Hosting
- Firestore
- Usa un proyecto existente
- dist como directorio público
- Configura como SPA: Yes

3. Construye la aplicación:
```bash
npm run build
```

4. Despliega a Firebase:
```bash
firebase deploy
```

La aplicación estará disponible en la URL que Firebase te proporcione (ejemplo: https://travel-tracker-xxxxx.web.app).

### Actualizaciones

Para actualizar la aplicación desplegada:

1. Haz tus cambios en el código
2. Construye la aplicación: `npm run build`
3. Despliega: `firebase deploy`

## Licencia

MIT App 🌎✈️

Una aplicación web para gestionar y rastrear tus viajes, construida con React y Firebase.

## Descripción

Travel Tracker te permite mantener un registro de tus viajes, planificar nuevos destinos y compartir tus experiencias. La aplicación utiliza autenticación de usuario y almacenamiento en tiempo real.

## Tecnologías Principales

- **React (^18.2.0)**: Framework de UI para construir interfaces de usuario interactivas
- **Vite (^5.0.0)**: Build tool y dev server que ofrece una experiencia de desarrollo más rápida
- **Firebase (^10.7.0)**: Plataforma de desarrollo que proporciona:
  - Autenticación de usuarios
  - Base de datos en tiempo real (Firestore)
  - Hosting
- **React Router DOM (^6.21.0)**: Manejo de rutas y navegación en la aplicación
- **Tailwind CSS (^3.3.6)**: Framework de CSS utility-first para diseño rápido y responsivo

## Requisitos Previos

- Node.js (versión 16 o superior)
- npm (incluido con Node.js)
- Cuenta en Firebase (para configuración del backend)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd travel-tracker
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura Firebase:
   - Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
   - Obtén las credenciales de configuración
   - Actualiza el archivo `src/firebaseConfig.js` con tus credenciales

## Desarrollo Local

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre tu navegador en `http://localhost:5173`

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Crea una build de producción
- `npm run preview`: Previsualiza la build de producción

## Estructura del Proyecto

```
travel-tracker/
├── src/
│   ├── components/     # Componentes React reutilizables
│   ├── firebaseConfig.js # Configuración de Firebase
│   ├── App.jsx         # Componente principal
│   └── index.css       # Estilos globales y Tailwind
├── public/            # Archivos estáticos
└── package.json       # Dependencias y scripts
```

## Características

- 🔐 Autenticación de usuarios
- 📝 Crear y editar viajes
- 📅 Organizar viajes por fechas
- 🌍 Visualización de destinos
- 📱 Diseño responsivo

## Contribuir

Si deseas contribuir al proyecto:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
