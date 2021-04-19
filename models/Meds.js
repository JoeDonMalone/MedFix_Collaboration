const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Meds extends Model {}

Meds.init(
  {
    // Manually define the primary key
    med_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    dosage: {
      type: DataTypes.STRING
    },
    regimen: {
      type: DataTypes.STRING
    },
    length: {
      type: DataTypes.INTEGER
    },
    side_effects: {
      type: DataTypes.STRING
    },
    refill: {
      type: DataTypes.BOOLEAN
    },
    remind_days: {
      type: DataTypes.STRING
    },
    remind_time: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    // Prevent sequelize from renaming the table
    freezeTableName: true,
    underscored: true,
    modelName: 'meds'
  }
);

module.exports = Meds;
