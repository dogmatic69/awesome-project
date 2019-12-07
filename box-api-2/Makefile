DOCKER_IMAGE = example-ci/api-2

include ../ci/docker/Makefile.audit
include ../ci/docker/Makefile.build
include ../ci/docker/Makefile.lint
include ../ci/docker/Makefile.publish

include ../ci/python/Makefile.audit
include ../ci/python/Makefile.lint
include ../ci/python/Makefile.test

include ../ci/makefile/Makefile.lint

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
	make docker-audit-trivy && \
	make python-bandit && \
	make python-xenon

.PHONY: lint
lint: init
	make docker-lint && \
	make python-lint && \
	make makefile-lint

.PHONY: test
test: init
	echo "test ..."
	# make nodejs-test && \
	# make nodejs-coverage

.PHONY: publish
publish: build
	make docker-publish
