import moongoose from "moongoose";

const connectDB = async ()=>{

    try {

        await moongoose.connect(process.env.MONGO_URI)
        console.log("Db Connected");
    } catch (error) {
        console.log("failed to connect the database",error);
        process.exit(1);
    }
}


export default connectDB;