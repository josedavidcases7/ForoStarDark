export const environment = {
    production: false,
    pusher: {
      key: 'your-pusher-key',               // Tu clave de Pusher
      cluster: 'your-pusher-cluster',       // El cluster de Pusher (ej. 'mt1')
      wsHost: 'ws.pusherapp.com',           // Dirección del WebSocket de Pusher
      wsPort: 80,                           // Puerto para WebSocket
      wssPort: 443,                         // Puerto para WebSocket seguro
      forceTLS: true,                       // Usar WebSocket seguro
      disableStats: true                    // Deshabilitar estadísticas de Pusher
    }
  };
  