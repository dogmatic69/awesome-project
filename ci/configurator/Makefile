REPO_PATH ?= ../../
TEMPLATE ?=

.PHONY: build
build:
	docker build -t configurator .

.PHONY: run
run: build
	docker run --rm -it \
		-v $(realpath ${REPO_PATH}):/repo \
		configurator /src/index.js $(TEMPLATE)
