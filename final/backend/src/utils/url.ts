export const backendurl =
  process.env.NODE_ENV === 'production'
    ? 'https://wp1121-final.onrender.com/api'
    : 'http://localhost:8080/api';

export const frontendUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://112-1-database-final.vercel.app'
    : 'http://localhost:3000';
