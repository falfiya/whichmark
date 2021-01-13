build:
	npx tsc
	node build

release: build
	npx terser --compress --mangle -- bin/whichmark.js

watch:
	npx tsc -w

.PHONY: build watch release
