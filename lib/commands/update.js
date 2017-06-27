const Config = require('./../modules/config');
const view = require('./../views/update');
const dir = require('./source/dir');
const git = require('./source/git');

exports.name = 'update';

const sourceTypes = {
	[git.name]: git.update
};

exports.setup = ( parser ) => {
};

exports.parse = async ( args ) => {
	const config = await Config();
	const sources = config.get('sources');

	view.header();
	for (const index in sources) {
		const source = sources[index];

		if (!sourceTypes[source.type]) {
			view.row(source);
		} else {
			const callback = async () => { await sourceTypes[git.name](); };
			view.row(source, callback);
		}
	}
};
