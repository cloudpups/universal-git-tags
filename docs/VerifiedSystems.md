# Verified Systems

This file contains all systems that have been verified as *supported*. External verifiers may have their username added in the associated section (if they choose).

## Motivation behind this document

Different systems have different requirements around how a Personal Access Token must be supplied in the extra headers.

For Base64 encoding, Google has a fairly handy tool: https://toolbox.googleapps.com/apps/encode_decode/

## GitHub

* [Generate a PAT](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) with the proper permissions to read and write to repositories.
* Using your **PAT** in place of `token`, encode the following string in Base64: `token`
* Using the newly encoded value in place of `encodedValue`, supply the following string to the Service Connection: `basic encodedValue`

## Azure DevOps

* [Generate a PAT](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=preview-page) with the proper permissions to read and write to repositories.
* Using your **PAT** in place of `token`, encode the following string in Base64: `:token`
  * **Notice** you must prepend your PAT with a colon *before* encoding it.
* Using the newly encoded value in place of `encodedValue`, supply the following string to the Service Connection: `basic encodedValue`

## BitBucket

* [Generate an App Password](https://support.atlassian.com/bitbucket-cloud/docs/app-passwords/) with the proper permissions to read and write to repositories.
* Using your **App Password** in place of `token`, and your **username** in place of `user`, encode the following string in Base64: `user:token`  
* Using the newly encoded value in place of `encodedValue`, supply the following string to the Service Connection: `Basic encodedValue`

## GitLab

* [Generate a PAT](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html) with the proper permissions to read and write to repositories.	*help with verification would be appreciated*
* Using your **App Password** in place of `token`, and your **username** in place of `user`, encode the following string in Base64: `user:token`  
* Using the newly encoded value in place of `encodedValue`, supply the following string to the Service Connection: `Basic encodedValue`