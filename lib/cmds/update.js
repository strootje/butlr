const Config = require('./../mods/config');
const view = require('./../views/update');
const factory = require('./source');

exports.name = 'update';

exports.setup = ( parser ) => {
};

exports.parse = async ( args ) => {
	const config = await Config();
	const sources = config.get('sources');

	view.header();
	for (const index in sources) {
		const source = sources[index];

		if (!true) {
			view.row(source);
		} else {
			const type = await factory(source);
			const callback = async () => await type.update();
			view.row(source, callback);
		}
	}
};
