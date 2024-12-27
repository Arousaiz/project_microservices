const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("user", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};