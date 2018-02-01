const express = require("express");
const cookieSession = require("cookie-session");	//https://github.com/expressjs/cookie-session
const formidable = require("formidable");
const logger = require("winston");					//https://github.com/winstonjs/winston
const bcrypt = require("bcrypt-nodejs");  			//https://github.com/shaneGirish/bcrypt-nodejs

const helpers = require("./helpers");
const m = require("./modeldata");
const initData = require("./init");

//Middlewares
const mw_sesion = require("./middlewares/mw_sesion");

//Routers
const rt_main = require("./middlewares/rt_main");

//Helpers------>
const jparse = helpers.jparse;
const logerror = helpers.logerror;
const gethashsalt = helpers.gethashsalt;
const isNullOrEmpty = helpers.isNullOrEmpty;

//Inititalizing APP-------->
const app = express();

app.set("view engine", "pug");
app.use("/public", express.static("static"));
app.use(cookieSession({
	name: "s3rt3cs3s10n",
	keys: ["hBordZ4ZKT", "7YCyYPqGp2","xiIUNEwRKc"],
	maxAge: 24*60*60*100*7 // 7dias
	
}));

logger.configure({
	transports:[
		new (logger.transports.Console)(),
		new (logger.transports.File)({filename: 'logsertec.log'})
	]
});

app.post("/login", function(req,res){
	try{
		let form = formidable.IncomingForm();
		form.parse(req, function(err, fields, files){
			//logger.info(fields,err);
			
			if(err){
				res.json(jparse(false, "Datos corruptos"));
				logerror(logger, err);
			}else{
				if(!isNullOrEmpty(fields.user) && !isNullOrEmpty(fields.pass)){
					let username = fields.user.trim();
					let password = fields.pass.trim();

					m.Usuario.findOne({where: {username: username, estado: 'A'}}).then(function(usuario){
						let hash = usuario.hash;
						let salt = usuario.salt;
						let total = "$2a$09$"+salt+hash;

						bcrypt.compare(password, total, function(err,result){
							if(err){
								logerror(logger,err);
								res.json(jparse(false,"Credenciales incorrectas"));
							}else{
								if(result){
									req.session = {
										usuario_id: usuario.usuario_id,
										nombre: usuario.nombre,
										apellido: usuario.apellido,
										login: new Date(),
										rol_id: usuario.rol_id,
										username: usuario.username,
										correo: usuario.correo,
										src_path: usuario.src_path,
									}
									res.json(jparse(true,"Credenciales correctas", {redirect: '/webapp'}));
								}else{
									res.json(jparse(false,"Credenciales incorrectas"));
								}
							}
						});
					}).catch(function(err){
						console.log(err);
						res.json(jparse(false, "Credenciales incorrectas"));
					});
				}else{
					logerror(logger, "Usuario o Password vacio");
					res.json(jparse(false, "Datos inválidos"));
				}
			}
		});
	}catch(err){
		res.json(jparse(false, "Error en el formulario"));
		logerror(logger,err);
	}
});

app.get("/logout", function(req,res){
	console.log("logout", req.session.usuario_id);
	if(req.session.usuario_id){
		req.session = null;
	}
	res.redirect("/");
});

app.get("/", function(req,res){
	res.render("index");
});



app.use("/webapp", mw_sesion);
app.use("/webapp", rt_main.getRouter(m,logger));

m.Sequelize.sync().then(function(){
	initData(m,logger, logerror, gethashsalt, bcrypt);
	let port = 2120;
	app.listen(port);
	logger.info("Listening at port", port);
});

//sequelize-auto -o "./models" -d dbsertec -h localhost -u postgres -x root -e postgres
