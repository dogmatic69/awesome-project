# MAKEFILE_PATH = $(realpath ${PWD}/ci/terraform/Makefile.lint)
include ../../ci/terraform/Makefile.lint

.PHONY: all
all: clean init lint

.PHONY: init
init:
	mkdir -p /tmp/output


.PHONY: clean
clean:
	rm -rf /tmp/output/*

.PHONY: build
build: init
	echo "build ..."

.PHONY: audit
audit: init
	echo "audit ..."

.PHONY: lint
lint: init
	make terraform-tflint && \
	make terraform-fmt

.PHONY: test
test: init
	echo "test ..."

.PHONY: publish
publish: build
	echo "publish ..."
