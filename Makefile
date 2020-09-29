install: install-deps


install-deps:
	npm ci
	npm link

start:
	npx node 'bin/gendiff.js' -h
run: 
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


