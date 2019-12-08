# Project Example

## Status

[![CI Pipeline](https://github.com/dogmatic69/awesome-project/workflows/Awesome%20Project%20CI/badge.svg)](https://github.com/dogmatic69/awesome-project)

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)


## Required Secrets

- SLACK_WEBHOOK: The web hook url that will be used to post slack notifications to
- OWNER_TOKEN: A user token with repo scope. This allows for example to create a PR in an action and also have the actions for a new PR triggered. See [here](https://github.com/peter-evans/create-pull-request/issues/48)
