GITHUB_WORKSPACE ?= ./

include ./ci/git/Makefile.audit
include ./ci/git/Makefile.lint
include ./ci/file/Makefile.lint

.PHONY: audit
audit:
	make git-gitleaks

.PHONY: lint
lint:
	GIT_CI_TOOL=git-conflicts make git-ci-with-ignore && \
	GIT_CI_TOOL=git-ignored make git-ci && \
	GIT_CI_TOOL=file-cr make file-ci && \
	GIT_CI_TOOL=file-crlf make file-ci && \
	GIT_CI_TOOL=file-trailing-newline make file-ci && \
	GIT_CI_TOOL=file-trailing-single-newline make file-ci && \
	GIT_CI_TOOL=file-trailing-space make file-ci && \
	GIT_CI_TOOL=file-utf8 make file-ci && \
	GIT_CI_TOOL=file-utf8-bom make file-ci
