IMAGE = example-ci/api-2

include ../ci/Makefile.build
include ../ci/Makefile.test
include ../ci/Makefile.trivy-scan
include ../ci/Makefile.publish-docker
include ../ci/Makefile.publish-npm

.PHONY: lint
lint: build
	mkdir -p /tmp/output
	touch /tmp/output/output.txt
	docker run --rm \
		-v /tmp/output/:/tmp/output/ \
		${IMAGE} -m flake8 --output-file=/tmp/output/output.txt ./