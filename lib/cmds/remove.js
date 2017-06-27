const source = require('./remove/source');

exports.name = 'remove';

const tasks = {
	[source.name]: source.parse
};

exports.setup = ( parser ) => {
	const subparsers = parser.addSubparsers({
		title: 'items',
		dest: 'item',
		choices: [
			source.name
		]
	});

	source.setup(subparsers.addParser(source.name, {
		addHelp: true
	}));
};

exports.parse = async ( args ) => {
	await tasks[args.item](args);
};
