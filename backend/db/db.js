import mongoose from "mongoose";

const connection = async () => {
    
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log('Connected successfully bro!!')
        
    } catch (error) {   
        return error
    }

}

export default connection

