require('dotenv').config();
 
const { once } = require('events');
 

 
const app = require('./app');
 
const PORT = 3005;

async function startServer() {
  try {
    const server = app.listen(PORT,'127.0.0.1');
    await once(server, 'listening');
    console.log(`Gym Management System running on http://localhost:${PORT}`);
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}
 
startServer();