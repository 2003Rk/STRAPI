const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 8000;

// Proxy to Strapi backend (port 1337)
app.use('/strapi', createProxyMiddleware({
  target: 'http://localhost:1337',
  changeOrigin: true,
  pathRewrite: {
    '^/strapi': ''
  }
}));

// Proxy to webhook server (port 3002)
app.use('/webhook', createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true
}));

// Default route info
app.get('/', (req, res) => {
  res.json({
    message: 'Proxy Server Running',
    status: 'online',
    services: {
      strapi: {
        admin: `${req.protocol}://${req.get('host')}/strapi/admin`,
        api: `${req.protocol}://${req.get('host')}/strapi/api`
      },
      webhook: `${req.protocol}://${req.get('host')}/webhook/strapi`
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on port ${PORT}`);
  console.log(`📡 Strapi Admin: http://localhost:${PORT}/strapi/admin`);
  console.log(`🔗 Webhook URL: http://localhost:${PORT}/webhook/strapi`);
});
