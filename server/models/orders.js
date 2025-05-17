module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define("orders", {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { // user makes many orders
            model: 'users',
            key: 'user_id'
        }
    },
    total_price: { type: DataTypes.INTEGER, }
  });

  // This is how Sequelize reads the relationships
  orders.associate = (models) => {
    orders.belongsTo(models.users, {foreignKey: 'user_id'})
    orders.hasMany(models.ordered_items)
  }
  return orders;
}