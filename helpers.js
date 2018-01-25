const jParse = function jparse(status, message, data){
	var packet = {};
	packet.status = status;
	packet.message = ((message==null)?"Unexpected error":message);
	packet.data = ((data==null)?{}:data);
	return packet;
}

const logError = function logError(logger,err){
	logger.error(err, {timestamp: Date.now(), pid: process.pid});
}

const logInfo = function logInfo(logger,data){
	logger.info(data, {timestamp: Date.now(), pid: process.pid});
}

const getHashSalt = function getHashSalt(password, bcrypt){
	try{
		let salt = bcrypt.genSaltSync(9);
		let hash = bcrypt.hashSync(password, salt);

		if(hash==null){
			return {hash: "", salt: "", error: true};
		}else{
			let nhash = hash.substring(salt.length, hash.length);
			let nsalt = salt.split("$")[3];

			return {hash: nhash, salt: nsalt, error: false};
		}
	}catch(err){
		console.log("Error generating hash! ",err);
		return {hash: "", salt: "", error: true};
	}
}

const comparePassword = function comparePassword(password, hash, salt,bcrypt){
	try{
		let total = "$2a$09$"+salt+hash;
		let result = bcrypt.compareSync(password, total);

		if(result!=null){
			return result;
		}

		return false;
	}catch(err){
		console.log("Error comparing password! ", err);
		return false;
	}
}

const isNullOrEmpty = function isNullOrEmpty(str){
	try{
		return (!str || /^\s*$/.test(str));
	}catch(err){
		console.log("Error at isNullOrEmpty. Value: ["+str+"].");
		return true;
	}
}

module.exports.jparse = jParse;
module.exports.logerror = logError;
module.exports.loginfo = logInfo;
module.exports.gethashsalt = getHashSalt;
module.exports.comparepassword = comparePassword;
module.exports.isNullOrEmpty = isNullOrEmpty;