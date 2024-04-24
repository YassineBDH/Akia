'use strict';

const app = require('./src/app');
const { initDB } = require('./src/db/initDB');

const PORT = 3001

app.listen(PORT, () => {
	console.log('Server is listening', { PORT });
	initDB();
});
