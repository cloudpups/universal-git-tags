import tl = require('azure-pipelines-task-lib/task');

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

function buildCredentialsFunction(credentials: GitTagCredentials) {
    if (credentials.Type == 'PersonalAccessToken') {
        console.log("Using PersonalAccessToken for Auth.")
        return function () {
            return function() {return `x-oauth-basic: ${credentials.Value}`;}
        }
    }

    return function () { return "";}
}

let execFunction : function(string, string[]) Q.Promise<number>  = tl.exec;

export async function addTag(options: TagOptions) {
    tl.exec("git", "init")

    const repoUrl = `${options.ServiceUrl}/${options.RepoId}.git`;

    const forceCommand = options.ForcePush === true ? " --force" : "";
    const tagMessageCommand = options.TagMessage === "" ? "" : `" -m ${options.TagMessage}"`;
    const commands = [
        "init",
        `config user.name "Universal Git Tags"`,
        "config user.email universal-git-tags@cloudpup.dev",
        `config http.extraheader "${buildCredentialsFunction(options.Credentials)}"`,
        `remote add origin ${repoUrl}`,
        `fetch origin ${options.CommitHash} --depth=1`,
        `tag -a "${options.TagName}"${tagMessageCommand} ${options.CommitHash}${forceCommand}`,
        `push origin "${options.TagName}"${forceCommand}`
    ];
        
    for(let command in commands) {
        await tl.exec("git", commands)
    }

    return {
        succeeded: true
    }
}