*Add a Tag to any commit, in any system**. *Sensible defaults included.*

For clarity, "any system" will always be a work in progress (more tools appear every week it seems!). So far, verified systems include the following:

### Supported Systems

* GitHub 
* BitBucket
* Azure DevOps Services

> Hi! 👋🏻 If you want to see a new service be tested, please open an Issue (if one does not exist) describing what you want supported. Including links to documentation around Access Token usage will help the request go through quicker.

## Universal Git Tags

This will add an annotated Tag to a commit and push it to the specified remote.

## Features

* ✔ Tag specific commit
* ✔ Sensible defaults ("specific commit" defaults to current commit, for example)
* ✔ Force Push (defaults to false)
   * Enables a "Docker latest" style of tagging. For example, you may have one long-lived tag name "Live" that you point towards different commits.
* ✔ Cross platform
   * Can run on updated build agents.
* ✔ Repository agnostic. 
   * Repository can be in GitHub, Azure DevOps, BitBucket, etc!

## Supplying Credentials

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

## Motivation

While other tasks exist for tagging, they did not satisfy our needs. See our longer explanation in the [source repo](https://github.com/cloudpups/universal-git-tags#motivation) for more detail.

## EULA

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.