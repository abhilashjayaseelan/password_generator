import mongoose from "mongoose"; 

const connectDB = async () => {
    try {
      const dbOptions = {
        dbName: 'password_generator', 
      };
      await mongoose.connect('mongodb://localhost:27017', dbOptions);
  
      console.log("Database connected...");
    } catch (error) {
      console.error("Database connection error", error);
      // Exiting the process or handle the error later
      process.exit(1);
    }
  };
  
  export default connectDB;
   