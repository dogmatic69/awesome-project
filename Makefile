GITHUB_WORKSPACE ?= ./

.PHONY: audit
audit:
	make git-gitleaks

.PHONY: lint
lint:
	echo "done"
