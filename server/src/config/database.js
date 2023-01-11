
import mongoose from "mongoose";

const connection = async () => {

    const URL = `mongodb+srv://${process.env.DB_ATLAT_USERNAME}:${process.env.DB_ATLAT_PASSWORD}@cluster0.efbi1us.mongodb.net/?retryWrites=true&w=majority`

    // for Docker
    // const option = {
    //     user: process.env.DB_USER,
    //     pass: process.env.DB_PASSWORD,
    //     dbName: process.env.DB_NAME,
    // };

    mongoose.set('strictQuery', true);
    await mongoose.connect(URL);

    const state = Number(mongoose.connection.readyState);

    console.log(state === 1 ? "Connected to db" : "Failed to connect");
};

export default connection;