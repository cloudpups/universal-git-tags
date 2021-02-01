For clarity, the "any system" goal will *always* be a work in progress. More tools seem to appear every week!

### Current Verified Systems

* [GitHub (cloud)][build]
* [BitBucket (cloud)][build]
* [GitLab (cloud)][build]
* [Azure DevOps Services][build]

> Hi! 👋🏻 If you want to see a new service be verified/supported, please open an [Issue](https://github.com/cloudpups/universal-git-tags/issues) (*please check if one already exists for your tool!*) describing what you want verified/supported. Including links to documentation around how access can be accomplished via the CLI, and better yet, detailed steps, will help the request go through quicker.

*Check out the sample build script that demonstrates some verified systems in action: [sample build definition link](https://github.com/cloudpups/universal-git-tags/blob/main/pipelines/example-pipeline.yml)*

## Universal Git Tags

Usage of this Task adds an annotated Tag to a commit and pushes it to the specified remote.

## Features

* ✔ Tag specific commit
* ✔ Sensible defaults ("specific commit" defaults to current commit, for example)
* ✔ Force Push (defaults to false)
   * Enables a "Docker latest" style of tagging. For example, you may have one long-lived tag name "Live" that you point towards different commits.
* ✔ Cross platform
   * Can run on updated build agents.
* ✔ Repository Host agnostic. 
   * Repository can be in GitHub, Azure DevOps, BitBucket, and more!

## Supplying Credentials

Different systems have different requirements around how a Personal Access Token must be supplied in the extra headers. For more details on to set up the associated Service Credentials for the various [Verified Systems](#current-verified-systems), please check out the [VerifiedSystems](https://github.com/cloudpups/universal-git-tags/blob/main/docs/VerifiedSystems.md) document.

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

[build]: https://dev.azure.com/JoshuaTheMiller/PublicExamples/_build?definitionId=6&_a=summary