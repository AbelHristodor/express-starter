const { DataTypes } = require('sequelize');

const db = require('../db');

const Profile = db.define('Profile', {
    cf: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    p_iva: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    profile_image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }
});

module.exports = Profile;
