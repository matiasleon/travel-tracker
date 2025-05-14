export const mockTrips = [
  {
    id: '1',
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
        completed: false,
        activities: []
      },
      {
        id: 'city2',
        name: 'Versalles',
        startDate: '2025-06-20',
        endDate: '2025-06-22',
        completed: false,
        activities: []
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    notes: 'Reservar tour nocturno por el Sena'
  },
  {
    id: '2',
    name: 'Explorando Japón',
    destination: 'Tokio, Japón',
    startDate: '2025-09-10',
    endDate: '2025-09-20',
    budget: 300000,
    currency: 'JPY',
    status: 'planning',
    activities: [
      'Distrito de Shibuya',
      'Templo Senso-ji',
      'Monte Fuji'
    ],
    cities: [
      {
        id: 'city3',
        name: 'Tokio',
        startDate: '2025-09-10',
        endDate: '2025-09-15',
        completed: false,
        activities: []
      },
      {
        id: 'city4',
        name: 'Kioto',
        startDate: '2025-09-15',
        endDate: '2025-09-20',
        completed: false,
        activities: []
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
    notes: 'Comprar Japan Rail Pass'
  },
  {
    id: '3',
    name: 'Tango y Cultura',
    destination: 'Buenos Aires, Argentina',
    startDate: '2025-07-05',
    endDate: '2025-07-10',
    budget: 150000,
    currency: 'ARS',
    status: 'confirmed',
    activities: [
      'Teatro Colón',
      'La Boca',
      'Plaza de Mayo'
    ],
    cities: [
      {
        id: 'city5',
        name: 'Buenos Aires',
        startDate: '2025-07-05',
        endDate: '2025-07-08',
        completed: false,
        activities: []
      },
      {
        id: 'city6',
        name: 'Tigre',
        startDate: '2025-07-08',
        endDate: '2025-07-10',
        completed: false,
        activities: []
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849',
    notes: 'Reservar show de tango'
  }
];
