## Motivation behind this document

Different systems have different requirements around how a Personal Access Token must be supplied in the extra headers.

For Base64 encoding, Google has a fairly handy tool: https://toolbox.googleapps.com/apps/encode_decode/

## Verified Systems

This file contains all systems that have been verified as *supported*. External verifiers may have their username added in the associated section (if they choose).

* [GitHub](#github)
* [Azure DevOps Services/Server 2019](#azure-devops-services)
* [BitBucket](#bitbucket)
* [GitLab](#gitlab)

### 🗝 Systems Section Layout 🗝

Each system's section contains various sub-sections:

* Repo Id: describes how the `Repo Id` *Task Input* should be formatted for that specific system.
* SCM Url: describes how the `SCM Url` field of the *Service Connection* should be formatted.
* Appropriately Formatted Credentials: describes how one should generate the appropriate string to enter in the `Appropriately Formatted Credentials` field of the *Service Connection*.

### GitHub

> GitHub is where over 56 million developers shape the future of software, together. ~GitHub

#### Repo Id

* `{AccountName}/{RepoName}`. For example, `cloudpups/universal-git-tags`

#### SCM Url

* `https://github.com/`

#### Appropriately Formatted Credentials

* [Generate a PAT](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) with the proper permissions to read and write to repositories.
* Using your **PAT** in place of `token`, encode the following string in Base64: `token`
* Using the newly encoded value in place of `encodedValue`, supply the following string to the Service Connection: `basic encodedValue`

### Azure DevOps Services

*Also works for Azure DevOps Server 2019*

> .Plan smarter, collaborate better, and ship faster with a set of modern dev services ~ Azure DevOps

#### Repo Id

* `{ProjectName}/_git/{RepoName}`. For example, `{JoshuaTheMiller}/_git/PublicExamples`

#### SCM Url

* Replace {OrgName} with the name of your Org: `https://{OrgName}@dev.azure.com/{OrgName}` For example, `https://JoshuaTheMiller@dev.azure.com/JoshuaTheMiller`.

#### Appropriately Formatted Credentials

* [Generate a PAT](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=preview-page) with the proper permissions to read and write to repositories.
* Using your **PAT** in place of `token`, encode the following string in Base64: `:token`
  * **Notice** you must prepend your PAT with a colon *before* encoding it.
* Using the newly encoded value in place of `encodedValue`, supply the following string to the Service Connection: `basic encodedValue`

### BitBucket

> Collaborate on code with inline comments and pull requests. ~ BitBucket

#### Repo Id

* `{ProjectName}/{RepoName}.git`. For example, `JoshuaDMiller/tagtests.git`.
  * *Please note* that {ProjectName} and {AccountName} may be different.

#### SCM Url

* Replace {AccountName} with the name of your Account: `https://{AccountName}@bitbucket.org`. For example, `https://JoshuaTheMiller@bitbucket.org`.

#### Appropriately Formatted Credentials

* [Generate an App Password](https://support.atlassian.com/bitbucket-cloud/docs/app-passwords/) with the proper permissions to read and write to repositories.
* Using your **App Password** in place of `token`, and your **username** in place of `user`, encode the following string in Base64: `user:token`  
* Using the newly encoded value in place of `encodedValue`, supply the following string to the Service Connection: `Basic encodedValue`

### GitLab

> From project planning and source code management to CI/CD and monitoring, GitLab is a complete DevOps platform, delivered as a single application. ~ GitLab

#### Repo Id

* `{AccountName}/{RepoName}.git`. For example, `JoshuaTheMiller/test.git`

#### SCM Url

* Replace {AccountName} with the name of your Account: `https://{AccountName}@gitlab.org`. For example, `https://JoshuaTheMiller@gitlab.com`.

#### Appropriately Formatted Credentials

* [Generate a PAT](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html) with the proper permissions to read and write to repositories.	*help with verification would be appreciated*
* Using your **App Password** in place of `token`, and your **username** in place of `user`, encode the following string in Base64: `user:token`  
* Using the newly encoded value in place of `encodedValue`, supply the following string to the Service Connection: `Basic encodedValue`