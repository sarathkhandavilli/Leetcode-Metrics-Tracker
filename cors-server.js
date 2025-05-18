const cors_proxy = require('./cors-anywhere/lib/cors-anywhere');

// Listen on a specific host via the HOST environment variable
const host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
const port = process.env.PORT || 8080;

// Create the CORS Anywhere server with custom configuration
const server = cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: [
        'cookie',
        'cookie2',
        'x-request-start',
        'x-request-id',
        'via',
        'connect-time',
        'total-route-time',
    ],
    redirectSameOrigin: true,
    httpProxyOptions: {
        xfwd: false,
    },
});

// Add error handling
server.on('error', (err) => {
    console.error('Server error:', err);
});

// Add request logging
server.on('request', (req, res) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
});

server.listen(port, host, function() {
    console.log('Running CORS Anywhere server on ' + host + ':' + port);
    console.log('Server is ready to handle requests');
}); 