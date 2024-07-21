const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModel');

const Budget = sequelize.define('Budget', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Budget;
