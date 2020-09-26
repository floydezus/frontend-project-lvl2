install: install-deps


install-deps:
	npm install

start:
	npx node 'bin/gendiff.js' -h

lint:
	npx eslint . --fix

publish:
	npm publish --dry-run

test:
	npm test


.PHONY: test


