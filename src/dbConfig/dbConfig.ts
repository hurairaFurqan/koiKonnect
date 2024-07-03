import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("Mongo DB Connected");

        })

        connection.on("error", (error) => {
            console.log("Mongo DB connection error" + error);
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong while connecting to DB", error);

    }
}