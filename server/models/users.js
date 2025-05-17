// Write code to create table
// Function to create model and export it from this file
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define("users", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    email: { type: DataTypes.STRING, },
    password: { type: DataTypes.STRING, }, // in format hashedpass:salt
    privilege: { type: DataTypes.INTEGER, 
      defaultValue: 0,
    }, // 0 = user, 1 = admin
    address: { type: DataTypes.INTEGER, }
  });

  // This is how Sequelize reads the relationships
  users.associate = (models) => {
    users.hasMany(models.orders)
  }

  return users;
}

