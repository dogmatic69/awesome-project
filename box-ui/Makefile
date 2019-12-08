DOCKER_IMAGE = example-ci/ui

include ../ci/docker/Makefile.audit
include ../ci/docker/Makefile.build
include ../ci/docker/Makefile.lint
include ../ci/docker/Makefile.publish

include ../ci/make/Makefile.lint

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
	make docker-audit-trivy

.PHONY: lint
lint: init
	make docker-lint && \
	make makefile-lint

.PHONY: test
test: init
	echo "YOLO ..."

.PHONY: publish
publish: build
	make docker-publish
