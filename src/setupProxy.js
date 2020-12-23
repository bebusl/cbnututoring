const { createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api',{
            target:"http://3.34.130.33:5000",
            changeOrigin : true,
        })
    );

};