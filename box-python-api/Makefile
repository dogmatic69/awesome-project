DOCKER_IMAGE = example-ci/python-api

include ../ci/docker/Makefile.build
include ../ci/docker/Makefile.publish

include ../ci/python/Makefile.audit
include ../ci/python/Makefile.lint
include ../ci/python/Makefile.test

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
	echo "audit ..."
	make python-bandit && \
	make python-xenon

.PHONY: lint
lint: init
	make python-lint

.PHONY: test
test: init
	echo "test ..."
	# make nodejs-test && \
	# make nodejs-coverage

.PHONY: publish
publish: build
	make docker-publish
