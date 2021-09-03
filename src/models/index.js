const User = require('./User');
const Profile = require('./Profile');

User.hasOne(Profile, {
    as: 'profile',
    onDelete: 'CASCADE'
});

Profile.belongsTo(User, {
    foreignKey: {
        allowNull: false,
    }
});

module.exports = { User, Profile };
