import { Config } from "./Config";

let config: Config = require('./../../../config.json');

export class ConfigManager {

    static getProjectId(): number {
        return config.projectId;
    }

    static getAssigneeId(): number {
        return config.assigneeId;
    }

    static getReviewerIds(): number[] {
        return config.reviewerIds;
    }
}