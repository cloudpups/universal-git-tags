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
    RawValue: string = "";
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
            Value: value,
            RawValue: value
        }
    }

    return {
        Success: true,
        Value: pipelineVariableValue,
        RawValue: value
    };
}

function failTask(message: string) {
    tl.setResult(tl.TaskResult.Failed, message);
}

function prepWorkingDirectory(input: { workingDirectory: string, rawWorkingDirectoryInput: string }) {
    tl.debug(`Realized Dir: "${input.workingDirectory}" Raw Dir:"${input.rawWorkingDirectoryInput}"`);
    
    const defaultWorkingDirectoryValue = "$(Build.ArtifactStagingDirectory)/universal-tagging-prep-currenttime";
    const defaultEndsWithValue = "universal-tagging-prep-currenttime";

    // Adding this check as Azure DevOps Pipelines *Pipelines* handles input differently than releases
    // Releases do not inject $(Build.ArtifactStagingDirectory) for the raw value, whereas Pipelines does.
    // TODO: would it be better to just always check for defaultEndsWithValue?
    if (input.rawWorkingDirectoryInput != defaultWorkingDirectoryValue && 
        !input.rawWorkingDirectoryInput.endsWith(defaultEndsWithValue)) {
        return input.workingDirectory;
    }

    // It appears that certain versions of Azure DevOps do not substitute $(Build.ArtifactStagingDirectory) appropriately.
    // To alleviate problems caused by strange characters in a path, this should be replaced.
    const valueThatShouldBeSubstituted = "$(Build.ArtifactStagingDirectory)";
    const pathStrippedOfIncorrectVariableSubstitution = input.workingDirectory.replace(valueThatShouldBeSubstituted, "artifact_staging_dir");

    const newPath = pathStrippedOfIncorrectVariableSubstitution.replace(defaultEndsWithValue, `universal-tagging-prep-${Date.now()}`);
    // TODO: put error handling here, though there should never be errors.    
    tl.mkdirP(newPath);
    console.log(`Prepped new folder at "${newPath}"`)
    return newPath;
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

    const maybeWorkingDirectory = tryGetValue('workingDirectory');
    if (maybeWorkingDirectory.Success == false) {
        failTask(maybeWorkingDirectory.Message);
        return;
    }
    const potentialWorkingDirectory = maybeWorkingDirectory.Value;

    const forcePush = tl.getBoolInput('forcePush', false);

    const maybeCredentialsId = tryGetValue('credentials');
    if (maybeCredentialsId.Success == false) {
        failTask(maybeCredentialsId.Message);
        return;
    }
    const credentialsId = maybeCredentialsId.Value;

    const endpoint = tl.getEndpointUrl(credentialsId, true);
    const token = tl.getEndpointAuthorizationParameter(credentialsId, "pat", false)

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

    const workingDirectory = prepWorkingDirectory({
        workingDirectory: potentialWorkingDirectory,
        rawWorkingDirectoryInput: maybeWorkingDirectory.RawValue
    });

    try {
        tl.cd(workingDirectory);
    }
    catch {
        tl.setResult(tl.TaskResult.Failed, "Error changing directory", true);
    }

    const executor = (toolName: string, args: string | string[]) => {
        tl.debug(`Executing ${toolName}`);
        return tl.exec(toolName, args);
    };

    const response = await tag.addTag({
        CommitHash: commitHash,
        ForcePush: forcePush,
        RepoId: repoId,
        ServiceUrl: endpoint!,
        TagMessage: tagMessage,
        TagName: tagName,
        Credentials: credentials
    }, executor);

    if (response.Succeeded) {
        return;
    }

    tl.setResult(tl.TaskResult.Failed, response.Message, true);
}

run();