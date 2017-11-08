let fs 		   = require('fs'),
	zlib 	   = require('zlib'),
	compress   = zlib.createGzip(),
	decompress = zlib.createGunzip();

module.exports.compress = (filePath) => {
	/*let readstream  = fs.createReadStream(filePath),
		newfilePath = `${filePath}.gz`,
		writestream = fs.createWriteStream(newfilePath);
		readstream.pipe(compress).pipe(writestream);

		fs.unlinkSync(filePath);*/
		fs.createReadStream(filePath).pipe(zlib.createGzip()).pipe(fs.createWriteStream(`${filePath}.gz`));
		fs.unlinkSync(filePath);

		/*newfilePath = `${filePath}.gz`,
		writestream = fs.createWriteStream(newfilePath);
	readstream.pipe(compress).pipe(writestream);*/
};

module.exports.decompress = (filePath) => {
	//let readstream = fs.createReadStream(filePath);
};