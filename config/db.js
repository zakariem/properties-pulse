import mongoose from "mongoose";

let connected = false;

export const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if (connected) {
        console.log('MongoDB Already Connected');
        return;
    }

    try {
        // Adding connection options for stability and timeouts
        await mongoose.connect(process.env.MONGODB_URL, {
            serverSelectionTimeoutMS: 30000, // Timeout after 30 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        });
        
        connected = true;
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('Error Connecting to MongoDB:', error.message);
        
        // Retry or additional logic can be added here based on the error type
        console.log('Retrying connection in 5 seconds...');
        setTimeout(connectDB, 5000); // Retry after 5 seconds
    }
};
