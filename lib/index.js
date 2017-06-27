const { ArgumentParser } = require('argparse');
const Config = require('./mods/config');

const add = require('./cmds/add');
const fix = require('./cmds/fix');
const install = require('./cmds/install');
const remove = require('./cmds/remove');
const update = require('./cmds/update');

const tasks = {
	[add.name]: add.parse,
	[fix.name]: fix.parse,
	[install.name]: install.parse,
	[remove.name]: remove.parse,
	[update.name]: update.parse
};

module.exports = async () => {
	const parser = new ArgumentParser({
		addHelp: true,
		version: '0.1.0'
	});

	const subparsers = parser.addSubparsers({
		title: 'tasks',
		dest: 'task',
		choices: [
			add.name,
			fix.name,
			install.name,
			remove.name,
			update.name
		]
	});

	add.setup(subparsers.addParser(add.name, {
		addHelp: true
	}));

	fix.setup(subparsers.addParser(fix.name, {
		addHelp: true
	}));

	install.setup(subparsers.addParser(install.name, {
		addHelp: true
	}));

	remove.setup(subparsers.addParser(remove.name, {
		addHelp: true
	}));

	update.setup(subparsers.addParser(update.name, {
		addHelp: true
	}));

	const args = parser.parseArgs();
	await tasks[args.task](args);
};
