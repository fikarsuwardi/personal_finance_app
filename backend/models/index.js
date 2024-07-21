const sequelize = require('../config/database');
const User = require('./userModel');
const Transaction = require('./transactionModel');
const Budget = require('./budgetModel');

User.hasMany(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Budget, { foreignKey: 'userId' });
Budget.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, Transaction, Budget };
