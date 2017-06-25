import { ArgumentParser } from "argparse";
import * as util from './util';
import * as install from './subcommands/install';

export default () => {
	util.config().catch(err => console.log("err:", err)).then(config => {

		const parser = new ArgumentParser({
			addHelp: true,
			version: '0.1.0'
		});

		const subparsers = parser.addSubparsers({
			title: 'tasks',
			dest: 'task'
		});

		install.setup(subparsers.addParser(install.name, {
			addHelp: true
		}));

		const args = parser.parseArgs();
		install.parse(config, args);

	});
};
