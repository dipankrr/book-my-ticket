import dotenv from 'dotenv'
import http from 'http'
import app from './src/app.js'
import { initDB } from './src/db/index.js'

dotenv.config({
    path: '.env'
})

const PORT = process.env.PORT || 5000


const startServer = async () => {
  try {
    await initDB(); 

    const server = http.createServer(app)
    server.listen(PORT, ()=>{
        console.log(`server running on port ${PORT}`);
    })

  } catch (err) {
    console.error("App failed to start");
    process.exit(1); 
  }
};

startServer();