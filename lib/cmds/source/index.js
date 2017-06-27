const dir = require('./dir');
const git = require('./git');

const types = {
	[dir.name]: dir.init,
	[git.name]: git.init
}

module.exports = async ( source ) => {
	return await types[source.type](source);
};
