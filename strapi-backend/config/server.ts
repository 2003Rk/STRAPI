export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL'), // Railway will provide this
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  // Allow ngrok and external domains
  proxy: true,
  admin: {
    serveAdminPanel: true,
    autoOpen: false,
    host: '0.0.0.0',
    forceHttp: false,
    watchIgnoreFiles: [
      './src/admin/vite.config.ts',
    ],
    build: {
      backend: env('STRAPI_ADMIN_BACKEND_URL', 'http://localhost:1337'),
    },
  },
  settings: {
    cors: {
      enabled: true,
      origin: ['*'],
      allowedHeaders: ['*'],
    },
  },
});
