const promisify = require('./promisify');
const { exists, mkdir } = promisify(require('fs'));
const { join } = require('path');

const mkdirp = async ( path ) => {
	path = path || '/';
	const paths = path.split(/\//gi);

	if (!await exists(join(...paths)))
	{
		paths.pop();
		mkdirp(join(...paths));
	}

	return await mkdir(path);
};

exports.mkdirp = mkdirp;
