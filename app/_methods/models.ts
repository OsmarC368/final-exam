import { sequilize } from "@/app/_methods/db";
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

interface Houses extends Model<InferAttributes<Houses>, InferCreationAttributes<Houses>>{
    id?: number,
    name: string, 
    motto: string,
    animal: string,
    region: string,
    shield?: string
}

interface Valyrians extends Model<InferAttributes<Valyrians>, InferCreationAttributes<Valyrians>>{
    id?: number,
    word: string,
    translation: string,
    pronunciation: string
}

interface Monarchs extends Model<InferAttributes<Monarchs>, InferCreationAttributes<Monarchs>>{
    id?: number,
    name: string,
    reign: number,
    predecessor: string,
    successor: string
}

interface Castles extends Model<InferAttributes<Castles>, InferCreationAttributes<Castles>>{
    id?: number,
    name: string,
    house: string,
    inCharge: string,
    location: string
}


const Houses = sequilize.define<Houses>("houses", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    motto: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    animal: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    region: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    shield: {
        type: DataTypes.TEXT,
        allowNull: true
    },

})

const Valyrians = sequilize.define<Valyrians>("valyrians", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    word: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    translation: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    pronunciation: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

})

const Monarchs = sequilize.define<Monarchs>("monarchs", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    reign: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    predecessor: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    successor: {
        type: DataTypes.TEXT,
        allowNull: false
    },

})

const Castles = sequilize.define<Castles>("castles", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    house: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    inCharge: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    location: {
        type: DataTypes.TEXT,
        allowNull: false
    }

})

await sequilize.sync({ alter: true })

export { Houses, Valyrians, Monarchs, Castles }