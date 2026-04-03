dotenv.config()
// import all secret variables first 
import dotenv from 'dotenv'
const PORT = process.env.PORT



import app from "./app.js";
import connection from "./db/db.js";

console.log(PORT) 
const startServer = async () => {
  try {
    connection().then(() => {
      app.listen(PORT, () => {
        console.log("⚙️ Server is running ")
      })
    }).catch((error) => {
      console.log(error)
    })
  } catch (error) {
    console.log('Faild to start Server: ', error)
    process.exit(1)
  }
}

startServer()