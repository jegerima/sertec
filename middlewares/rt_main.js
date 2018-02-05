const express = require("express");
const formidable = require("formidable");
const helpers = require("../helpers");

//Helpers------>
const jparse = helpers.jparse;
const logerror = helpers.logerror;

module.exports.getRouter = function(m, logger){
	var router = express.Router();

	router.get(["/main", "/"], function(req,res){
		try{
			res.render("main", {ok: true, pagina: 'Dashboard'});
		}catch(err){
			logerror(logger,err);
			res.render("main", {ok: false, pagina: 'Dashboard', error: error});
		}
	});

	return router;
}