# Entidad Trip

La entidad `Trip` representa un viaje dentro de la aplicación Travel Tracker. A continuación se detalla su estructura, atributos y ejemplos de uso.

## Estructura de la Entidad

```js
{
  id: string,             // Identificador único del viaje
  userRole: string,       // Rol del usuario respecto al viaje (ej: 'admin')
  createdBy: string,      // ID del usuario creador
  name: string,           // Nombre del viaje
  destination: string,    // Destino principal
  startDate: string,      // Fecha de inicio (YYYY-MM-DD)
  endDate: string,        // Fecha de fin (YYYY-MM-DD)
  budget: number,         // Presupuesto estimado
  currency: string,       // Moneda del presupuesto
  status: string,         // Estado del viaje (ej: 'planned', 'completed')
  activities: Array,      // Actividades generales del viaje (pueden ser strings u objetos)
  cities: Array,          // Lista de ciudades visitadas (ver estructura abajo)
  imageUrl: string,       // Imagen representativa del viaje
  notes: string           // Notas adicionales
}
```

## Ejemplo

```js
{
  id: '1',
  userRole: 'admin',
  createdBy: 'mock-user-id',
  name: 'Aventura en París',
  destination: 'París, Francia',
  startDate: '2025-06-15',
  endDate: '2025-06-22',
  budget: 2500,
  currency: 'EUR',
  status: 'planned',
  activities: [
    'Visita a la Torre Eiffel',
    'Museo del Louvre',
    'Paseo por Champs-Élysées'
  ],
  cities: [
    {
      id: 'city1',
      name: 'París',
      startDate: '2025-06-15',
      endDate: '2025-06-20',
      status: 'planned',
      activities: [],
      observations: 'Reservar tour nocturno por el Sena'
    },
    {
      id: 'city2',
      name: 'Versalles',
      startDate: '2025-06-20',
      endDate: '2025-06-22',
      status: 'planned',
      activities: [],
      observations: 'Reservar tour nocturno por el Sena'
    }
  ],
  imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
  notes: 'Reservar tour nocturno por el Sena'
}
```

## Descripción de las Entidades Principales

### Entidad Trip

- **id**: Identificador único del viaje.
- **userRole**: Rol del usuario respecto al viaje (ej: 'admin', 'viewer').
- **createdBy**: ID del usuario que creó el viaje.
- **name**: Nombre del viaje.
- **destination**: Destino principal del viaje.
- **startDate**: Fecha de inicio del viaje en formato `YYYY-MM-DD`.
- **endDate**: Fecha de finalización del viaje en formato `YYYY-MM-DD`.
- **budget**: Presupuesto estimado para el viaje.
- **currency**: Moneda utilizada para el presupuesto (ej: 'USD', 'EUR').
- **status**: Estado actual del viaje ('planned', 'in-progress', 'completed', 'cancelled').
- **activities**: Lista de actividades generales del viaje.
- **cities**: Lista de ciudades incluidas en el viaje (array de objetos City).
- **imageUrl**: URL de la imagen representativa del viaje.
- **notes**: Notas generales sobre el viaje.

### Entidad City

- **id**: Identificador único de la ciudad.
- **name**: Nombre de la ciudad.
- **startDate**: Fecha de llegada a la ciudad en formato `YYYY-MM-DD`.
- **endDate**: Fecha de salida de la ciudad en formato `YYYY-MM-DD`.
- **status**: Estado de la visita a la ciudad ('planned', 'in-progress', 'completed', 'cancelled').
- **activities**: Lista de actividades específicas para esta ciudad (array de objetos Activity).
- **observations**: Observaciones o notas específicas sobre la estancia en la ciudad.
- **completedAt**: Fecha en que se marcó la ciudad como completada (solo si status es 'completed').

### Entidad Activity

- **id**: Identificador único de la actividad.
- **name**: Nombre o descripción de la actividad.
- **status**: Estado de la actividad ('pending', 'completed').
- **date**: Fecha programada para la actividad (opcional).
- **time**: Hora programada para la actividad (opcional).
- **location**: Ubicación específica de la actividad (opcional).
- **notes**: Notas adicionales sobre la actividad.
- **isUpdating**: Estado temporal que indica si la actividad está siendo actualizada (para UX Optimistic).

## Patrones de Diseño Implementados

### Patrón ECO (Edición Contextual Optimista)

Las entidades de la aplicación están diseñadas para trabajar con el patrón ECO, que permite la edición in-line con feedback visual inmediato. Este patrón se aplica principalmente a:

1. **Observaciones de ciudades**: Permite editar las observaciones directamente en la tarjeta de la ciudad.
2. **Actividades**: Facilita la creación y edición de actividades con feedback inmediato.

Para soportar este patrón, las entidades incluyen propiedades temporales como `isUpdating` que no se almacenan en la base de datos pero son fundamentales para la experiencia de usuario.

### UX Optimistic

Las entidades están diseñadas para permitir actualizaciones optimistas en la interfaz de usuario:

1. Los cambios se reflejan inmediatamente en la UI
2. Se mantiene un estado temporal durante la "actualización"
3. En caso de error, se revierte al estado anterior

## Notas adicionales

- El modelo puede extenderse para soportar más campos según necesidades futuras (por ejemplo, colaboradores, checklist, etc).
- Las entidades están preparadas para una futura migración a Firebase u otro backend real.
