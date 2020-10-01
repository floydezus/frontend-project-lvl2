install: install-deps
	 link	


install-deps:
	npm ci

link:
	npm link

start:
	npx node 'bin/gendiff.js' -h
help: 
	gendiff -h	

lint:
	npx eslint .

publish:
	npm publish --dry-run

test:
	npm test
	
test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test


