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