"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpConstants = exports.Constants = void 0;
const ConfigManager_1 = require("./Config/ConfigManager");
const EnvironmentVariables_1 = require("./Environment/EnvironmentVariables");
class Constants {
}
exports.Constants = Constants;
class HttpConstants {
}
exports.HttpConstants = HttpConstants;
HttpConstants.commomHeaders = {
    'PRIVATE-TOKEN': EnvironmentVariables_1.EnvironmentVariables.getGitlabPrivateToken()
};
// Base path
HttpConstants.basePath = "https://gitlab.sharedservices.local/api/v4";
// Merge Requests
HttpConstants.mergeRequestEndpoint = `${HttpConstants.basePath}/projects/${ConfigManager_1.ConfigManager.getProjectId()}/merge_requests`;
// Issue
HttpConstants.issueEndpoint = `${HttpConstants.basePath}/projects/${ConfigManager_1.ConfigManager.getProjectId()}/issues`;
