/**
 * @typedef {Object} TripUser
 * @property {string} email - Email del usuario
 * @property {('admin'|'viewer')} role - Rol del usuario en el viaje
 */

/**
 * @typedef {Object} City
 * @property {string} id - ID único de la ciudad
 * @property {string} name - Nombre de la ciudad
 * @property {string} startDate - Fecha de inicio de la visita
 * @property {string} endDate - Fecha de fin de la visita
 * @property {boolean} completed - Si la visita a la ciudad está completada
 * @property {string|null} completedAt - Fecha en que se marcó como completada
 * @property {Activity[]} activities - Lista de actividades en la ciudad
 */

/**
 * @typedef {Object} Activity
 * @property {string} id - ID único de la actividad
 * @property {string} name - Nombre de la actividad
 * @property {string} startDate - Fecha y hora de inicio
 * @property {string} endDate - Fecha y hora de fin
 * @property {boolean} completed - Si la actividad está completada
 * @property {string|null} completedAt - Fecha en que se marcó como completada
 */

/**
 * @typedef {Object} Transport
 * @property {string} type - Tipo de transporte ('flight'|'train'|'bus'|'car')
 * @property {string} startDate - Fecha y hora de salida
 * @property {string} endDate - Fecha y hora de llegada
 */

/**
 * Crea un nuevo viaje con valores por defecto
 * @param {Object} data - Datos iniciales del viaje
 * @param {string} data.name - Nombre del viaje
 * @param {string} data.description - Descripción del viaje
 * @param {string} data.startDate - Fecha de inicio
 * @param {string} data.endDate - Fecha de fin
 * @param {string} creatorId - ID del usuario que crea el viaje
 * @param {string} creatorEmail - Email del usuario que crea el viaje
 * @returns {Object} Nuevo viaje
 */
export const createTrip = (data, creatorId, creatorEmail) => {
  const now = new Date().toISOString();
  
  return {
    name: data.name,
    description: data.description || '',
    startDate: data.startDate || now,
    endDate: data.endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 semana por defecto
    createdAt: now,
    updatedAt: now,
    createdBy: creatorId,
    cities: [],
    transport: [],
    travelers: [
      {
        email: creatorEmail,
        role: 'admin'
      }
    ],
    followers: []
  };
};
