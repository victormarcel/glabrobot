import { ConfigManager } from "./Config/ConfigManager";
import { EnvironmentVariables } from "./Environment/EnvironmentVariables";

class Constants {

}

class HttpConstants {
    static readonly commomHeaders = {
        'PRIVATE-TOKEN': EnvironmentVariables.getGitlabPrivateToken()
    };

    // Base path
    static readonly basePath = "https://gitlab.sharedservices.local/api/v4";

    // Merge Requests
    static readonly mergeRequestEndpoint = `${HttpConstants.basePath}/projects/${ConfigManager.getProjectId()}/merge_requests`;

    // Issue
    static readonly issueEndpoint = `${HttpConstants.basePath}/projects/${ConfigManager.getProjectId()}/issues`;
}

export { Constants, HttpConstants }