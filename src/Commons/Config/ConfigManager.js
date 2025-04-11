"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigManager = void 0;
let config = require('./../../../config.json');
class ConfigManager {
    static getProjectId() {
        return config.projectId;
    }
    static getAssigneeId() {
        return config.assigneeId;
    }
    static getReviewerIds() {
        return config.reviewerIds;
    }
    static getMilestoneId() {
        return config.milestoneId;
    }
}
exports.ConfigManager = ConfigManager;
