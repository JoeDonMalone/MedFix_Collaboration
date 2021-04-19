const User = require('./User');
const Meds = require('./Meds');

// Define a User as having many Meds, thus creating a foreign key in the `meds` table
User.hasMany(Meds, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// The association can also be created from the Meds side

Meds.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Meds };
