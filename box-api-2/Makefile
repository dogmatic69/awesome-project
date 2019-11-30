IMAGE = example-ci/api-2

include ../ci/Makefile.build
include ../ci/Makefile.test
include ../ci/Makefile.publish

.PHONY: lint
lint: build
	docker run --rm ${IMAGE} -m flake8 ./