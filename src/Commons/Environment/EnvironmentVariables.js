"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentVariables = void 0;
var Name;
(function (Name) {
    Name["GitlabPrivateToken"] = "GITLAB_PRIVATE_TOKEN";
})(Name || (Name = {}));
const variables = process.env;
class EnvironmentVariables {
    static getGitlabPrivateToken() {
        return variables["GITLAB_PRIVATE_TOKEN"] || "";
    }
}
exports.EnvironmentVariables = EnvironmentVariables;
