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

## Descripción de los campos principales

- **id**: Identificador único del viaje.
- **userRole**: Rol del usuario respecto al viaje (ej: 'admin', 'viewer').
- **createdBy**: ID del usuario que creó el viaje.
- **name**: Nombre del viaje.
- **destination**: Destino principal del viaje.
- **startDate** / **endDate**: Fechas de inicio y fin del viaje en formato `YYYY-MM-DD`.
- **budget**: Presupuesto estimado para el viaje.
- **currency**: Moneda utilizada para el presupuesto.
- **status**: Estado del viaje. Puede ser 'planned', 'in_progress', 'completed' o 'cancelled'.
- **activities**: Lista de cityActivity generales del viaje cada elemento es una estructura más compleja
- **cityActivity**: Contiene name y status. Status puede ser 'planned', 'in_progress', 'completed' o 'cancelled'.
- **cities**: Lista de ciudades visitadas. Cada ciudad es un objeto con sus propios campos (id, name, fechas, actividades, status). Status puede ser 'planned', 'in_progress', 'completed' o 'cancelled'.  
- **observations**: Observaciones sobre la ciudad o estadia.
- **imageUrl**: URL de una imagen representativa del viaje.
- **notes**: Notas adicionales relevantes para el viaje.

## Notas adicionales
- El modelo puede extenderse para soportar más campos según necesidades futuras (por ejemplo, colaboradores, checklist, etc).
- Las actividades pueden evolucionar para ser objetos con más detalle (nombre, descripción, estado, etc).
