/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('solicitud_detalle', {
    solicitud_detalle_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    solicitud_detalle_no: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    solicitud_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'solicitud',
        key: 'solicitud_id'
      }
    },
    equipo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    marca: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    modelo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    serie: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    desperfecto: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    garantia_piezas: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    estado: {
      type: DataTypes.CHAR,
      allowNull: true,
      defaultValue: 'A'
    }
  }, {
    tableName: 'solicitud_detalle'
  });
};
