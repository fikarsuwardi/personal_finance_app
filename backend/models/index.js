const sequelize = require('../config/database');
const User = require('./userModel');
const Transaction = require('./transactionModel');

User.hasMany(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, Transaction };
