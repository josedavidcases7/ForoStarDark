export const environment = {
    production: false, // Siempre falso para desarrollo
    pusher: {
      key: 'your-pusher-key', // Clave de tu proyecto Pusher o Laravel WebSockets
      cluster: 'mt1',         // Cambia según tu configuración de Pusher
      wsHost: 'localhost',    // Dirección de tu servidor WebSocket en desarrollo
      wsPort: 6001,
      wssPort: 6001,
      forceTLS: false,
      disableStats: true,
    },
  };
  