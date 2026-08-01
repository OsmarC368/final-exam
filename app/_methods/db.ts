import "server-only"
import { MongoClient } from "mongodb";
import { MONGODB_URI } from "@/app/_methods/variables";
import { POSTGRE_URI } from "@/app/_methods/variables";
import { Sequelize } from "sequelize";
import pg from "pg";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

const mongodb = new MongoClient(MONGODB_URI);
const mongodbConexion = mongodb.connect();

const sequilize = new Sequelize(POSTGRE_URI, {
  dialect: "postgres",
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnnauthorized: false
    }
  }
});

export { mongodbConexion, sequilize }