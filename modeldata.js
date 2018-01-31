const sequelize = require('sequelize');

const md_usuario = require('./models/usuario');
const md_rol = require('./models/rol')
const md_cliente = require('./models/cliente');
const md_tipo_servicio = require('./models/tipo_servicio');
const md_solicitud = require('./models/solicitud');
const md_solicitud_detalle = require('./models/solicitud_detalle');

const sqldb = new sequelize('dbsertec', 'postgres', 'root', {
	host: 'localhost',
	dialect: 'postgres',
	port: 5432,
	logging: false,
	pool:{
		max: 5,
		min: 0,
		idle: 10000
	},
});

console.log("SQLConfig OK");

const Rol = new md_rol(sqldb, sequelize);
//console.log("Table", Rol+": OK");

const Usuario = new md_usuario(sqldb, sequelize);
//console.log("Table", Usuario+": OK");
Usuario.belongsTo(Rol, {foreignKey: 'rol_id'});

const Cliente = new md_cliente(sqldb, sequelize);
//console.log("Table", Cliente+": OK");

const TipoServicio = new md_tipo_servicio(sqldb, sequelize);
//console.log("Table", TipoServicio+": OK");

const Solicitud = new md_solicitud(sqldb, sequelize);
//console.log("Table", Solicitud+": OK");

Solicitud.belongsTo(TipoServicio, {foreignKey: 'tipo_servicio_codigo'});
Solicitud.belongsTo(Usuario, {foreignKey: 'usuario_id'});

const SolicitudDetalle = new md_solicitud_detalle(sqldb, sequelize);
//console.log("Table", SolicitudDetalle+": OK");

Solicitud.hasMany(SolicitudDetalle, {foreignKey: 'solicitud_id'});
SolicitudDetalle.belongsTo(Solicitud, {foreignKey: 'solicitud_id'});


//Exportando modelos...
module.exports.Usuario = Usuario;
module.exports.Rol = Rol;
module.exports.Cliente = Cliente;
module.exports.TipoServicio = TipoServicio;
module.exports.Solicitud = Solicitud;
module.exports.SolicitudDetalle = SolicitudDetalle;

module.exports.Sequelize = sqldb;
module.exports.DataType =  sequelize;



