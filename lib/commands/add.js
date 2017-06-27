const package = require('./add/package');
const source = require('./add/source');

exports.name = 'add';

const tasks = {
	[package.name]: package.parse,
	[source.name]: source.parse
};

exports.setup = ( parser ) => {
	const subparsers = parser.addSubparsers({
		title: 'items',
		dest: 'item',
		choices: [
			package.name,
			source.name
		]
	});

	package.setup(subparsers.addParser(package.name, {
		addHelp: true
	}));

	source.setup(subparsers.addParser(source.name, {
		addHelp: true
	}));
};

exports.parse = async ( args ) => {
	await tasks[args.item](args);
};
