install: install-deps


install-deps:
	npm install

start:
	npx babel-node 'src/bin/gendiff.js'

lint:
	npx eslint .

publish:
	npm publish --dry-run
