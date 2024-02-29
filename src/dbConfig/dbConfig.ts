import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Connected to MongoDB");
        });
        connection.on("disconnected", () => {
            console.log("MongoDB disconnected");
        })
        connection.on("error", (error) => {
            console.log("Connection Error in MongoDB");
            console.log(error);
            // process.exit();
        })

    } catch (error) {
        console.log("Error from connectDB function : ");
        console.log(error);
    }
}

export { connectDB };