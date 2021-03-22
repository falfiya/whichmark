build:
	npx tsc
	node build

release: bin/whichmark.js
	npx tsc
	node build
	npx terser --compress --mangle -o $< -- $<

watch:
	npx tsc -w

firefox := "C:\Program Files\Firefox Developer Edition\firefox.exe"

install: build
	$(firefox) bin/whichmark.xpi

.PHONY: build watch release
