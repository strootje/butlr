import searchDir from './dir';

export default async ( sources, query ) => {
	const results = [];

	for (const index in sources) {
		const source = sources[index];
		const pkgs = await searchDir(source, query);
		results.push(pkgs);
	}

	return results.reduce((a,b) => a.concat(b));
};
