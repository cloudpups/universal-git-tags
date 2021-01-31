# Universal Git Tags

An Azure DevOps Pipelines Plugin that adds a Task with broader SCM support and less opinions than other git tag related Tasks.

## Motivation

There are many [plugins related to Git Tags](https://marketplace.visualstudio.com/search?term=git%20tag&target=AzureDevOps&category=All%20categories&sortBy=Relevance) in existance today. Why create another?

The answer is fairly simple: the existing tag plugins today seem to support a specific SCM (e.g. Azure DevOps Repos, GitHub, GitLab), and/or take a strict stance on what the tag's name should be (e.g. `Buid.BuildId`, `ReleaseName`). This plugin aims to support any SCM, and to provide customization *with sensible defaults*.

Futhermore, while it is true that a script could either be added inline or in the repo itself to accomplish a similar result, that adds extra stuff/cruft to the repository and pipeline definition that must now be maintianed. If you prefer to use the built in tasks of a specific pipeline platform (e.g. Circle CI, Azure DevOps) in liue of using a Gulp/Maven runner, then encapsulating/abstracting such an operation in a single Task should make sense (DRY). If you *do* prefer using pipeline platforms as a mechanism to simply kick off your own custom build scripts, then this extension probably does not fit your needs.

## Supplying PATs from different systems

Different systems have different requirements around how a Personal Access Token must be supplied in the extra headers.

For Base64 encoding, Google has a fairly handy tool: https://toolbox.googleapps.com/apps/encode_decode/

### GitHub

* [Generate a PAT](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) with the proper permissions to read and write to repositories.
* Using your **PAT** in place of `token`, encode the following string in Base64: `token`
* Using the newly encoded value in place of `encodedValue`, supply the following string to the Service Connection: `basic encodedValue`

### Azure DevOps

* [Generate a PAT](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=preview-page) with the proper permissions to read and write to repositories.
* Using your **PAT** in place of `token`, encode the following string in Base64: `:token`
  * **Notice** you must prepend your PAT with a colon *before* encoding it.
* Using the newly encoded value in place of `encodedValue`, supply the following string to the Service Connection: `basic encodedValue`

### GitLab

*help with verification would be appreciated*

## Development

```sh
tfx extension create --manifests azure-devops-extension.json
```