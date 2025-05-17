
module.exports = (sequelize, DataTypes) => {
  const ordered_items = sequelize.define("ordered_items", {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { // One order consists of many items
        model: 'orders',
        key: 'order_id'
      }
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { // Ordered items are instances of products
            model: 'products',
            key: 'product_id'
        }
    },
    quantity: { type: DataTypes.INTEGER, },
  });

  // This is how Sequelize reads the relationships
  ordered_items.associate = (models) => {
    ordered_items.belongsTo(models.orders, {foreignKey: 'order_id'})
    ordered_items.belongsTo(models.products, {foreignKey: 'product_id'})
  }
  return ordered_items;
}