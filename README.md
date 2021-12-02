# Universal Git Tags

An Azure DevOps Pipelines Plugin that adds a Task with broader SCM support and less opinions than other git tag related Tasks.

## Documentation

* [Overview](./docs/Overview.md)
* [Verified/Supported Systems and Usage Guidelines](./docs/VerifiedSystems.md)

## Motivation

There are many [plugins related to Git Tags](https://marketplace.visualstudio.com/search?term=git%20tag&target=AzureDevOps&category=All%20categories&sortBy=Relevance) in existance today. Why create another?

The answer is fairly simple: the existing tag plugins today seem to support a specific SCM (e.g. Azure DevOps Repos, GitHub, GitLab), and/or take a strict stance on what the tag's name should be (e.g. `Buid.BuildId`, `ReleaseName`). This plugin aims to support any SCM, and to provide customization *with sensible defaults*.

Futhermore, while it is true that a script could either be added inline or in the repo itself to accomplish a similar result, that adds extra stuff/cruft to the repository and pipeline definition that must now be maintained. If you prefer to use the built in tasks of a specific pipeline platform (e.g. Circle CI, Azure DevOps) in liue of using a Gulp/Maven runner, then encapsulating/abstracting such an operation in a single Task should make sense (DRY). If you *do* prefer using pipeline platforms as a mechanism to simply kick off your own custom build scripts, then this extension probably does not fit your needs.

## Development

```sh
tfx extension create --manifests azure-devops-extension.json --overrides-file configs/beta.json
tfx extension create --manifests azure-devops-extension.json --overrides-file configs/live.json
```
