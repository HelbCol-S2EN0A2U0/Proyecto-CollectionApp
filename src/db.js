import mongoose from "mongoose";

const connectDB = async () => {
  //Usamos el metodo para conectarnos a la BdD de mongoose
  const clientOptions = {
    serverApi: {
      version: "1",
      strict: true,
      deprecationErrors: true,
    },
  };

  try {
    await mongoose.connect(process.env.MONGODB_URI, clientOptions);
    console.log("Conectado a MONGOBD Atlas (WEB)");
  } catch (error) {
    console.log(
      `Ocurrio el siguiente error al conectarse a MongoDB == ${error.message}`
    );
  }
};
export default connectDB;
