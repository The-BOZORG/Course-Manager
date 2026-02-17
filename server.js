import database from './configs/dbConfig.js';
import app from './index.js';

import colors from 'colors';

//server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await database.authenticate();
    console.log('Mysql connection successfully 🟢'.green);

    await database.sync({ force: true });
    console.log('Models synced successfully 🟢'.green);

    app.listen(PORT, () => {
      console.log(`Server running in http://localhost:${PORT}`.cyan.bold);
    });
  } catch (error) {
    console.error('Database connection failed 🔴', error.message.red);
    process.exit(1);
  }
};

const closeDB = async () => {
  console.log('Closing DB...'.red.bold);
  try {
    await database.close();
    console.log('DB closed 🔴'.red);
  } catch (err) {
    console.error('Error closing DB:', err.red);
  }
  process.exit(0);
};

process.on('SIGINT', closeDB);
process.on('SIGTERM', closeDB);

startServer();
