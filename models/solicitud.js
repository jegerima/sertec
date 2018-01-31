/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('solicitud', {
    solicitud_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    solicitud_no: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    tipo_servicio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_servicio',
        key: 'tipo_servicio_id'
      }
    },
    solicitado_por: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cliente',
        key: 'cliente_id'
      }
    },
    operador: {
      type: DataTypes.STRING,
      allowNull: true
    },
    atendido_por: {
      type: DataTypes.STRING,
      allowNull: true
    },
    reporte: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    conexion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    garantia: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    garantia_monto: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    observacion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'usuario_id'
      }
    },
    estado: {
      type: DataTypes.CHAR,
      allowNull: true,
      defaultValue: 'A'
    }
  }, {
    tableName: 'solicitud'
  });
};
