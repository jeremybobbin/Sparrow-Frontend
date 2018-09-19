const router = require('./src/app');
const app = require('express')();
const config = require('./src/config');
const {port} = config;

//app.use('*', (req, res, next) => {
//	console.log(req.body);
//});

app.use('/api', router);

app.listen(port, () => console.log('Now listening on port: ' + port));
