const express = require("express");
const cookieSession = require("cookie-session");	//https://github.com/expressjs/cookie-session
const formidable = require("formidable");
const logger = require("winston");					//https://github.com/winstonjs/winston
const bcrypt = require("bcrypt-nodejs");  			//https://github.com/shaneGirish/bcrypt-nodejs

const helpers = require("./helpers");
//const m = require("./modeldata");
//const initData = require("./init");

//Helpers------>
const jparse = helpers.jparse;
const logerror = helpers.logerror;
const gethashsalt = helpers.gethashsalt;

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

app.get("/", function(req,res){
	res.send(jparse(true,"Servicio Técnico Index",{}));
});

let port = 2120;
app.listen(port);
logger.info("Listening at port", port);