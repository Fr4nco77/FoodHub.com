const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type:DataTypes.STRING,
      defaultValue: "https://definicion.de/wp-content/uploads/2022/08/figuras-geometricas.png"
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 100
      }
    },
    steps: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, { timestamps: false });
};
