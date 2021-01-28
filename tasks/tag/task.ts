import tl = require('azure-pipelines-task-lib/task');
import tag = require('./tag');

type MaybeValue = ValueNotFound | ValueFound;

class ValueNotFound {
    Success: false = false;
    Message: string = "";
}

class ValueFound {
    Success: true = true;
    Value: string = "";
}

function tryGetValue(inputName: string): MaybeValue {
    const value = tl.getInput(inputName, true);
    if (value == 'bad' || value == undefined) {
        return {
            Success: false,
            Message: `Bad input was given for ${inputName}`
        };
    }

    // Force fetching here in case it is a recognized build variable.
    // If not, that is just a small performance hit that we can 
    // swallow.
    // There has to be a better way to do this.
    const pipelineVariableValue = tl.getVariable(value)

    if (pipelineVariableValue == undefined) {
        return {
            Success: true,
            Value: value
        }
    }

    return {
        Success: true,
        Value: pipelineVariableValue
    };
}

function failTask(message: string) {
    tl.setResult(tl.TaskResult.Failed, message);
}

async function run() {
    const maybeRepoId = tryGetValue('repoId');
    if (maybeRepoId.Success == false) {
        tl.setResult(tl.TaskResult.Failed, maybeRepoId.Message);
        return;
    }
    const repoId = maybeRepoId.Value;

    const maybeCommitHash = tryGetValue('commitHash');
    if (maybeCommitHash.Success == false) {
        failTask(maybeCommitHash.Message);
        return;
    }
    const commitHash = maybeCommitHash.Value;

    const maybeTagName = tryGetValue('tagName');
    if (maybeTagName.Success == false) {
        failTask(maybeTagName.Message);
        return;
    }
    const tagName = maybeTagName.Value;

    const maybeTagMessage = tryGetValue('tagMessage');
    if (maybeTagMessage.Success == false) {
        failTask(maybeTagMessage.Message);
        return;
    }
    const tagMessage = maybeTagMessage.Value;


    const forcePush = tl.getBoolInput('forcePush', false);

    const maybeCredentialsId = tryGetValue('credentials');
    if (maybeCredentialsId.Success == false) {
        failTask(maybeCredentialsId.Message);
        return;
    }
    const credentialsId = maybeCredentialsId.Value;

    const endpoint = tl.getEndpointUrl(credentialsId, true);
    const token = tl.getEndpointAuthorizationParameter(credentialsId, "pat", false)

    console.log(`${repoId} ${commitHash} ${tagName} ${tagMessage} ${forcePush} ${JSON.stringify({
        url: endpoint,
        pat: token
    })}`);


    let credentials: tag.GitTagCredentials;
    if (token != undefined) {
        credentials = {
            Type: "PersonalAccessToken",
            Value: token!
        };
    }
    else {
        credentials = {
            Type: 'NoCredentials'
        }
    }

    await tag.addTag({
        CommitHash: commitHash,
        ForcePush: forcePush,
        RepoId: repoId,
        ServiceUrl: endpoint!,
        TagMessage: tagMessage,
        TagName: tagName,
        Credentials: credentials
    });
}

run();