const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 8080;

// Enable CORS for all routes
app.use(cors());

// Proxy middleware configuration
const proxyOptions = {
    target: 'https://leetcode.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api/': '/', // rewrite path
    },
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    },
};

// Use proxy for all requests to /api
app.use('/api', createProxyMiddleware(proxyOptions));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(port, () => {
    console.log(`CORS proxy server running on port ${port}`);
}); 