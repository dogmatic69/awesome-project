IMAGE = example-ci/api-1

include ../ci/Makefile.build
include ../ci/Makefile.publish

.PHONY: lint
lint: build
	docker run --rm ${IMAGE} lint

.PHONY: test
test: build
	docker run --rm -v $(realpath ./tests):/src/tests ${IMAGE} test
