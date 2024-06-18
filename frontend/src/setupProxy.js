// npm install http-proxy-middleware
const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/storyApi',
        createProxyMiddleware({
            target: 'http://localhost:8081',
            changeOrigin: true,
        })
    );
    app.use(
        '/gaugeInfoApi',
        createProxyMiddleware({
            target: 'http://localhost:8081',
            changeOrigin: true,
        })
    );
};
