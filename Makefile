install: install-deps


install-deps:
	sudo npm install

start:
	npx node 'src/bin/gendiff.js' -h

lint:
	npx eslint .

publish:
	npm publish --dry-run

test:
	npm test


.PHONY: test


