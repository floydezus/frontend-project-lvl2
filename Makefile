install: install-deps


install-deps:
	npm ci

start:
	npx node 'bin/gendiff.js' -h

lint:
	npx eslint . --fix

publish:
	npm publish --dry-run

test:
	npm test
	
test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test


