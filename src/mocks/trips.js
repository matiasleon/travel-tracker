export const mockTrips = [
  {
    id: '1',
    userRole: 'admin',
    createdBy: 'mock-user-id',
    name: 'Viaje a Europa',
    destination: 'Europa',
    startDate: '2025-06-15',
    endDate: '2025-06-22',
    budget: 2500,
    currency: 'EUR',
    status: 'planned',
    updates: [],
    cities: [
      {
        id: 'city1',
        name: 'Barcelona',
        startDate: '2025-06-15',
        endDate: '2025-06-20',
        status: 'planned',
        observations: 'Reservar tour nocturno por el Sena',
        activities: [{
          name: 'Paseo barceloneta',
          status: 'planned'
        }]
      },
      {
        id: 'city2',
        name: 'Londres',
        startDate: '2025-06-15',
        endDate: '2025-06-20',
        status: 'planned',
        observations: '',
        activities: [{
          name: 'Picadilly circus',
          status: 'planned'
        }]
      },
      {
        id: 'city3',
        name: 'Nottingham',
        startDate: '2025-06-20',
        endDate: '2025-06-22',
        status: 'planned',
        observations: 'Reservar tour nocturno por el Sena',
        activities: [{
          name: 'Warhammer',
          status: 'planned'
        }]
      },
      {
        id: 'city4',
        name: 'Manchester',
        startDate: '2025-06-20',
        endDate: '2025-06-22',
        status: 'planned',
        observations: 'Reservar tour nocturno por el Sena',
        activities: []
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    notes: 'Reservar tour nocturno por el Sena'
  }
];
