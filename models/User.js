const { DataTypes } = require("sequelize");
const { db } = require("../db");

const User = db.define(
    "User",
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            // allowNull: false,
            unique: true,
        },
        profile: {
            type: DataTypes.STRING,
            defaultValue: "user.svg",
        },
        gender: {
            type: DataTypes.ENUM("Male", "Female"),
        },
    },
    {
        freezeTableName: true,
    }
);

module.exports = User;
