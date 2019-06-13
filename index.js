const FuzzySearch = require('fuzzy-search');
const alfy = require('alfy');
const { readFileSync } = require('fs');

const data = JSON.parse(readFileSync('./emoji.json', 'utf-8'));
const search = new FuzzySearch(data, [ 'title', 'shortCode' ]);
let matches = search.search(alfy.input).map((m) => {
	return {
		title        : m.title,
		// subtitle: m.description,
		arg          : m.emoji,
		autocomplete : m.shortCode,
		mods         : {
			cmd : {
				valid : true,
				arg   : m.hexCode
			},
			alt : {
				valid : true,
				arg   : m.shortCode
			}
		}
	};
});

if (matches.length == 0) {
  matches = [{
    title: 'Nothing found'
  }]
}

let a = alfy.matches('', matches, 'title');
alfy.output(a);
