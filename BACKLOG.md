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

## En Progreso 🚧

### Gestión de Viajes
- [ ] Validación de campos en formularios
- [ ] Feedback visual al usuario
- [ ] Edición de viajes
- [ ] Eliminación de viajes
- [ ] Vista detallada funcional

### Gestión de Ciudades
- [ ] Agregar ciudades a un viaje (formulario existente)
- [] Agregar comentario sobre la ciudad o estadia 
- [ ] Editar información de ciudades
- [ ] Eliminar ciudades
- [ ] Ordenar ciudades por fecha

### Actividades
- [ ] Implementar AddActivityForm
- [ ] Marcar actividades como completadas
- [ ] Eliminar actividades
- [ ] Reordenar actividades

### UI/UX
- [ ] Loading states
- [ ] Error handling
- [ ] Animaciones y transiciones
- [ ] Responsive design
- [ ] Tema claro/oscuro

## Próximas Características 🔜

### Planificación
- [ ] Calendario de viaje
- [ ] Timeline de actividades
- [ ] Presupuesto por ciudad/actividad
- [ ] Checklist de preparativos

### Integración
- [ ] Google Maps para ubicaciones
- [ ] Crear mapa de ciudades en base al listado
- [ ] Clima por ciudad
- [ ] Fotos de lugares
- [ ] Exportar itinerario

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

1. No se refresca al crear viaje nuevo
2. La lista de viajes no se actualiza inmediatamente al crear un nuevo viaje
3. El estado de los viajes se pierde al recargar la página
4. Falta validación en el formulario de creación
5. No se puede crear una ciudad
6. El formulario de ciudades existe pero no está conectado
7. Las actividades no se pueden agregar aunque existe el componente

## Mejoras Técnicas 🛠️

1. Implementar TypeScript
2. Agregar tests unitarios
3. Configurar CI/CD
4. Optimizar rendimiento
5. Mejorar estructura del proyecto
6. Documentar componentes
7. Agregar Storybook
8. Migrar a Firebase cuando esté listo
9. Implementar sistema de rutas
10. Mejorar manejo de estado global

## Notas 📝

- Priorizar la experiencia de usuario
- Mantener el diseño simple y funcional
- Seguir las mejores prácticas de React
- Documentar decisiones técnicas importantes
