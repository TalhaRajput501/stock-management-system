// import all secret variables first 
import dotenv from 'dotenv'
dotenv.config()



import app from "./app.js";
import connection from "./db/db.js";

const startServer = async () => {
  try {
    connection().then(() => {
      app.listen(80, () => {
        console.log("⚙️ server is running ")
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