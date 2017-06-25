import { readdir, readFile, createWriteStream } from 'fs';
import { request } from 'http';
import { join } from 'path';
import chalk from 'chalk';
import cliui from 'cliui';

import search from './../search';

const ui = cliui({
	width: 80
});

exports.name = "install";

export function setup( parser ) {
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

export function parse( config, args ) {
	search(config.sources, args.query).then(pkgs => {
		if (args.search) {
			ui.div(
				{
					text: chalk.bold('package')
				}
			);

			for (const index in pkgs) {
				const pkg = pkgs[index];

				ui.div(
					{
						text: pkg.name
					}
				);
			}

			console.log(ui.toString());
		} else {
			const file = pkgs[0];
			console.log('installing ::: ', file);
			const writer = createWriteStream("/home/bastiaan/Downloads/Minecraft.jar");
			const req = request(file.downloads.launcher, message => {
				message.pipe(writer);
				writer.on('finish', () => writer.close());
			});

			req.end();
		}
	});
};
