const Config = require('./../mods/config');
const view = require('./../views/install');
const factory = require('./source');

exports.name = 'install';

exports.setup = ( parser ) => {
	parser.addArgument([ '--search', '-s' ], {
		required: false,
		action: 'storeTrue'
	});

	parser.addArgument([ '--unstable', '-u' ], {
		required: false,
		action: 'storeTrue'
	});

	parser.addArgument([ 'query' ], {
		action: 'store'
	});
};

exports.parse = async ( args ) => {
	const config = await Config();
	const sources = config.get('sources');

	if (args.search) {
		view.header();
		for (const index in sources) {
			const source = sources[index];
			const type = await factory(source);
			const pkgs = await type.search(args.query);

			for (const i2 in pkgs) {
				const pkg = pkgs[i2];
				view.row(pkg);
			}
		}
	} else {
		console.log('todo: installing');
	}
};