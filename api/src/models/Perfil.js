const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('perfil', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre_perfil: {
      type: DataTypes.STRING,
      allowNull:false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull:true
    },
    estado: {
      type: DataTypes.SMALLINT,
      defaultValue: 1
    },
  },{
    timestamps: false
  });
};
