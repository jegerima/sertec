module.exports = function(m, logger, logerror,gethashsalt, bcrypt){
	m.Rol.findAll().then(function(hayroles){
		if(hayroles){
			if(hayroles.length!=null && hayroles.length<=0){
				logger.info("No existen data... creando...");

				//================= > Roles
				let bulk_roles = [];

				let sa = {};
				sa.nombre = "rootadmin";
				sa.codigo = "RA";

				let a = {};
				a.nombre = "administrador";
				a.codigo = "AD";

				let e = {};
				e.nombre = "empleado";
				e.codigo = "EM";

				bulk_roles.push(sa);
				bulk_roles.push(a);
				bulk_roles.push(e);

				m.Rol.bulkCreate(bulk_roles).then(function(roles){
					logger.info("Creado(s) "+bulk_roles.length+" rol(es)");

					//================= > Usuarios
					let bulk_usuarios = [];

					let yo = {};
					yo.nombre = "Jefferson";
					yo.apellido = "Rivera";
					yo.username = "jegerima";
					yo.correo = "jegerima@gmail.com";
					let yo_hs = gethashsalt("jeger02ima", bcrypt);
					if(yo_hs.error==false){
						yo.hash = yo_hs.hash;
						yo.salt = yo_hs.salt;
					}else{
						console.log("ERROR! aborting!", "User1");
						return;
					}
					yo.rol_id = 1;

					let ao = {};
					ao.nombre = "Alexander";
					ao.apellido = "Orellana";
					ao.username = "aorellana";
					ao.correo = "aorellana@acristudio.com";
					let ao_hs = gethashsalt("aorellana", bcrypt);
					if(ao_hs.error==false){
						ao.hash = ao_hs.hash;
						ao.salt = ao_hs.salt;
					}else{
						console.log("ERROR! aborting!", "User2");
						return;
					}
					ao.rol_id = 2;

					bulk_usuarios.push(yo);
					bulk_usuarios.push(ao);					

					m.Usuario.bulkCreate(bulk_usuarios).then(function(usuarios){
						logger.info("Creado(s) "+bulk_usuarios.length+" usuario(s)");

						//================= > Tipo Servicio
						let bulk_servicio = [];

						let reparacion = {};
						reparacion.nombre = "Reparacion";
						reparacion.codigo = "REP";

						let mantenimiento = {};
						mantenimiento.nombre = "Mantenimiento";
						mantenimiento.codigo = "MAN";

						bulk_servicio.push(reparacion);
						bulk_servicio.push(mantenimiento);							

						m.TipoServicio.bulkCreate(bulk_servicio).then(function(tipos){
							logger.info("Creado(s) "+bulk_servicio.length+" tipo(s) de servicio");

						}).catch(function(err){ logerror(logger, err); })
					}).catch(function(err){ logerror(logger, err); })
				}).catch(function(err){ logerror(logger, err); })
			}else{
				logger.info("Datos listos!");
			}
		}else{
			logger.info("Whats going on?");
		}
	}).catch(function(err){ 
		logerror(logger, err); 
	});
}