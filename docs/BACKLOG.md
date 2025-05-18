# Travel Tracker - Backlog

## Implementado ✅

### Componentes Base
- [x] Layout principal con Navbar
- [x] Sistema de autenticación mock
- [x] DateRangePicker para fechas

### Gestión de Viajes
- [x] Lista de viajes (TripList)
- [x] Tarjeta de viaje (TripItem)
- [x] Formulario de creación (TripForm)
- [x] Floating Action Button
- [x] Integración con datos mock

### Gestión de Ciudades
- [x] Componente de ciudad (CityCard)
- [x] Formulario para agregar ciudad (AddCityForm)
- [x] Mostrar observaciones de ciudades
- [x] Editar observaciones de ciudades (patrón ECO)
- [x] Agregar actividades a ciudades

## En Progreso 🚧

### Gestión de Viajes
- [ ] Validación de campos en formularios
- [x] Feedback visual al usuario (implementado con sistema de notificaciones)
- [ ] Edición de viajes
- [ ] Eliminación de viajes
- [ ] Vista detallada funcional

### Gestión de Ciudades
- [ ] Agregar ciudades a un viaje (formulario existente)
- [x] Agregar comentario sobre la ciudad o estadia 
- [x] Editar observaciones de ciudades (patrón ECO)
- [ ] Editar información general de ciudades
- [ ] Eliminar ciudades
- [ ] Ordenar ciudades por fecha

### Actividades
- [x] Agregar actividades a ciudades
- [x] Marcar actividades como completadas
- [ ] Eliminar actividades
- [ ] Reordenar actividades

### UI/UX
- [x] Loading states (implementados en componentes con edición)
- [x] Error handling (sistema de notificaciones)
- [x] Animaciones y transiciones
- [x] Responsive design
- [x] Implementación del patrón ECO (Edición Contextual Optimista)
- [x] Sistema de notificaciones para feedback al usuario
- [x] Variables CSS centralizadas
- [ ] Tema claro/oscuro

## Próximas Características 🔜

### Planificación
- [ ] Calendario de viaje
- [ ] Timeline de actividades
- [ ] Presupuesto por ciudad/actividad
- [ ] Checklist de preparativos

### Integración
- [x] Google Maps para ubicaciones
- [x] Crear mapa de ciudades en base al listado
- [x] Clima por ciudad
- [x] Fotos de lugares
- [x] Exportar itinerario

### Social
- [ ] Compartir viajes
- [ ] Invitar colaboradores
- [ ] Comentarios en actividades
- [ ] Feed de actualizaciones

### Datos
- [ ] Migrar a Firebase
- [ ] Autenticación de usuarios
- [ ] Persistencia de datos
- [ ] Caché offline

## Bugs Conocidos 🐛

~~1. No se refresca al crear viaje nuevo~~ ✅ RESUELTO con sistema de notificaciones
~~2. La lista de viajes no se actualiza inmediatamente al crear un nuevo viaje~~ ✅ RESUELTO con UX Optimistic
3. El estado de los viajes se pierde al recargar la página
~~4. Falta validación en el formulario de creación~~ ✅ RESUELTO
8. Advertencias de linting relacionadas con la propiedad `composes` en CSS Modules
9. Advertencias de linting relacionadas con las directivas `@tailwind` en index.css

## Mejoras Técnicas 

1. Implementar TypeScript
2. Agregar tests unitarios
3. Configurar CI/CD
4. Optimizar rendimiento
5. ~~Mejorar estructura del proyecto~~ IMPLEMENTADO con organización por características
6. ~~Documentar componentes~~ IMPLEMENTADO con documentación de patrones (DESIGN_PATTERNS.md)
7. Agregar Storybook
8. Migrar a Firebase cuando esté listo
9. Implementar sistema de rutas
10. ~~Mejorar manejo de estado global~~ IMPLEMENTADO con Context API y hooks personalizados
11. ~~Implementar patrón de diseño consistente~~ IMPLEMENTADO con patrón ECO
12. ~~Sistema de variables CSS centralizado~~ IMPLEMENTADO
13. ~~Sistema de notificaciones para feedback~~ IMPLEMENTADO

## Notas 

- Priorizar la experiencia de usuario
- Mantener el diseño simple y funcional
- Seguir las mejores prácticas de React
- Documentar decisiones técnicas importantes
- Utilizar el patrón ECO (Edición Contextual Optimista) para todos los componentes editables
- Mantener la consistencia visual con las variables CSS centralizadas
- Implementar UX Optimistic para todas las operaciones de actualización
