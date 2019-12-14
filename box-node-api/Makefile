DOCKER_IMAGE = example-ci/node-api

include ../ci/docker/Makefile.build
include ../ci/docker/Makefile.publish

include ../ci/nodejs/Makefile.audit
include ../ci/nodejs/Makefile.lint
include ../ci/nodejs/Makefile.test

.PHONY: all
all: clean init build audit lint test

.PHONY: init
init:
	mkdir -p /tmp/output


.PHONY: clean
clean:
	rm -rf /tmp/output/*

.PHONY: build
build: init
	make docker-build

.PHONY: audit
audit: init
	make nodejs-audit-yarn && \
	make nodejs-audit-retirejs && \
	make nodejs-audit-scan

.PHONY: lint
lint: init
	make nodejs-lint

.PHONY: test
test: init
	make nodejs-test && \
	make nodejs-coverage

.PHONY: publish
publish: build
	make docker-publish
