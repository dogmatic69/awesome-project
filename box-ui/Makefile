DOCKER_IMAGE = example-ci/ui

include ../ci/docker/Makefile.build
include ../ci/docker/Makefile.publish

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
	echo "audit"

.PHONY: lint
lint: init
	echo "lint"

.PHONY: test
test: init
	echo "YOLO ..."

.PHONY: publish
publish: build
	make docker-publish
