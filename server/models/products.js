module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define("products", {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    product_name: { type: DataTypes.STRING, },
    product_description: { type: DataTypes.STRING, },
    price: { type: DataTypes.INTEGER, }, // in pence
    stock: { type: DataTypes.INTEGER, },
    image: { type: DataTypes.STRING, }, // URL of image
    discount: { type: DataTypes.INTEGER, default: 0}, // as percentage
    // TODO: if this doesn't work remove default
  });

  // This is how Sequelize reads the relationships
  products.associate = (models) => {
    products.hasMany(models.ordered_items)
  }
  return products;
}