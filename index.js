'use strict';

require('dotenv').config();
const app = require('./src/app');

const { initDB } = require('./src/db/initDB');

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log('Server is listening', { PORT });
	initDB();
});
