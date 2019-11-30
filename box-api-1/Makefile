IMAGE = example-ci/api-1

include ../ci/Makefile.build
include ../ci/Makefile.trivy-scan
include ../ci/Makefile.publish

.PHONY: lint
lint: build
	mkdir -p /tmp/output
	touch /tmp/output/output.txt
	docker run --rm \
		-v /tmp/output/:/tmp/output/ \
		${IMAGE} lint

.PHONY: test
test: build
	mkdir -p /tmp/output
	touch /tmp/output/output.txt
	docker run --rm \
		-v /tmp/output/:/tmp/output/ \
		-v $(realpath ./tests):/src/tests \
		${IMAGE} test
