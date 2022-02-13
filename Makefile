

release: bin/whichmark.xpi
	-

build: bin/whichmark.js
	-

bin/whichmark.js:
	npx tsc
	node build

bin/whichmark.xpi: bin/whichmark.js
	npx terser --compress --mangle -o $< -- $<

watch:
	npx tsc -w

firefox := "C:\Program Files\Firefox Developer Edition\firefox.exe"

install: build
	$(firefox) bin/whichmark.xpi

.PHONY: build watch release
