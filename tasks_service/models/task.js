const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("task", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        userId: {
            allowNull: false,
            foreignKey: true,
            type: DataTypes.BIGINT
        },
        projectId: {
            allowNull: false,
            foreignKey: true,
            type: DataTypes.BIGINT
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        hours: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        createdAt: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: null,
        },
    });
};