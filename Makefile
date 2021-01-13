build:
	npx tsc
	node build

release: bin/whichmark.js
	npx tsc
	node build
	npx terser --compress --mangle -o $< -- $<

watch:
	npx tsc -w

.PHONY: build watch release
