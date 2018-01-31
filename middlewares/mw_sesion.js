module.exports = function(req, res, next){
	console.log('URI:', req.url);
	if(!req.session.usuario_id){
		res.redirect("/");
	}else{
		res.locals = {usuario: req.session};
		next();
	}
}