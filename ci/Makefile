include ./make/Makefile.lint

.PHONY: lint
lint:
	for FILE in $(shell find ./ -type f -name "Make*"); do \
		echo $${FILE}; \
	done;
