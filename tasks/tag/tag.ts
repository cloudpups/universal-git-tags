import * as NodeGit from 'nodegit';

export interface PersonalAccessToken {
    Value: string
    Type: 'PersonalAccessToken'
}

export interface NoCredentials { Type: 'NoCredentials' }

export type GitTagCredentials = PersonalAccessToken | NoCredentials;

export interface TagOptions {
    ServiceUrl: string
    RepoId: string
    CommitHash: string
    TagName: string
    TagMessage: string
    Credentials: GitTagCredentials
    ForcePush: boolean
}

function generateTagRefSpec(name: string, force: boolean) {
    if (force) {
        return `+refs/tags/${name}`;
    }

    return `refs/tags/${name}`;
}

async function getCommit(repo: NodeGit.Repository, commitHash: string) {
    try {
        const commit = await repo.getCommit(commitHash);
        return {
            succeeded: true,
            commit: commit
        }
    }
    catch (e) {
        return {
            succeeded: false
        }
    }
}

function buildCredentialsFunction(credentials: GitTagCredentials) {
    if (credentials.Type == 'PersonalAccessToken') {
        console.log("Using PersonalAccessToken for Auth.")
        return function () {
            return NodeGit.Cred.userpassPlaintextNew(credentials.Value, "x-oauth-basic");
        }
    }

    return function () { }
}

async function fetchRepo(repo: NodeGit.Repository, remote: NodeGit.Remote, credentials: GitTagCredentials) {
    try {
        await repo.fetch(remote, {
            callbacks: {
                credentials: buildCredentialsFunction(credentials)
            }
        });
        return true;
    }
    catch {
        return false;
    }
}

async function setTag(remote: NodeGit.Remote, tagRefSpec: string, credentials: GitTagCredentials) {
    try {
        await remote.push([tagRefSpec], {
            callbacks: {
                credentials: buildCredentialsFunction(credentials)
            }
        });
        return true;
    }
    catch {
        return false;
    }
}

export async function addTag(options: TagOptions) {
    const repo = await NodeGit.Repository.init("someRepo", 0);
    console.log(`Cloning repo to ${repo.path()}`);

    const repoUrl = `${options.ServiceUrl}/${options.RepoId}.git`;
    const remote = await NodeGit.Remote.create(repo, "origin", repoUrl);

    const repoFetchStatus = await fetchRepo(repo, remote, options.Credentials);

    if (repoFetchStatus == false) {
        return {
            succeeded: false,
            message: "Failed to fetch repository. Are the correct credentials used?"
        }
    }

    const { commit, succeeded } = await getCommit(repo, options.CommitHash)

    if (succeeded == false) {
        return {
            succeeded: false,
            message: "Failed to retrieve commit. Is supplied commit hash valid?"
        }
    }

    const commitObject = await NodeGit.Object.lookup(repo, commit!.id(), NodeGit.Object.TYPE.COMMIT);

    var signature = NodeGit.Signature.now("Universal Tag", "universal-git-tag@cloudpup.dev");

    await NodeGit.Tag.create(repo, options.TagName, commitObject, signature, options.TagMessage, 1);

    const tagRefSpec = generateTagRefSpec(options.TagName, options.ForcePush);
    const setTagResponse = await setTag(remote, tagRefSpec, options.Credentials);

    if (setTagResponse == false && options.ForcePush == false) {
        return {
            succeeded: false,
            message: `Failed to push tag. Please check that the tag does not already exist, and that the credentials are correct.`
        }
    } else if (setTagResponse == false) {
        return {
            succeeded: false,
            message: `Failed to push tag. Please check that the credentials are correct and are allowed to force push.`
        }
    }

    return {
        succeeded: true
    }
}