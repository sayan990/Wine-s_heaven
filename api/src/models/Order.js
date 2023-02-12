const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('order', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    products: {
        type: DataTypes.ARRAY(
            DataTypes.JSON({ type: DataTypes.JSON(DataTypes.STRING) })
        ),
      allowNull: false,
    },
    sendPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    payState: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    sendState: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
};
