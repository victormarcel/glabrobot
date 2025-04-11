enum Name {
    GitlabPrivateToken = "GITLAB_PRIVATE_TOKEN"
}

const variables = process.env;

export class EnvironmentVariables {

    static getGitlabPrivateToken(): string {
        return variables["GITLAB_PRIVATE_TOKEN"] || ""
    }
}