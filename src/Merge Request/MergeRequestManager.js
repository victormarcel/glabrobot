"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MergeRequestManager = void 0;
const axios_1 = __importDefault(require("axios"));
const CommandLineManager_1 = require("../Commons/Command Line/CommandLineManager");
const Labels_1 = require("../Commons/Enums/Labels");
const Constants_1 = require("../Commons/Constants");
const MergeRequestAction_1 = require("./Models/MergeRequestAction");
const IssueManager_1 = require("../Issue/IssueManager");
const ConfigManager_1 = require("../Commons/Config/ConfigManager");
const MergeRequestParameter_1 = require("./Models/MergeRequestParameter");
const GitManager_1 = require("../Commons/Git/GitManager");
class MergeRequestManager {
    performAction() {
        return __awaiter(this, void 0, void 0, function* () {
            let mrAction = CommandLineManager_1.CommandLineManager.extractParameter(MergeRequestAction_1.MergeRequestAction.Main);
            switch (mrAction) {
                case MergeRequestAction_1.MergeRequestAction.Create: {
                    this.createMergeRequest();
                    break;
                }
                default: {
                    console.log(`GitLab Robot: Merge request command not found: ${mrAction}`);
                }
            }
        });
    }
    createMergeRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            const issueIid = yield this.getRelatedIssueIid();
            const mrTitle = (yield GitManager_1.GitManager.getCommitLastDescription()) || "";
            const sourceBranch = (yield GitManager_1.GitManager.getCurrentBranch()) || "";
            const data = {
                assignee_id: ConfigManager_1.ConfigManager.getAssigneeId(),
                reviewer_ids: ConfigManager_1.ConfigManager.getReviewerIds(),
                source_branch: sourceBranch,
                target_branch: CommandLineManager_1.CommandLineManager.extractParameter(MergeRequestParameter_1.MergeRequesParameters.TargetBranch),
                title: mrTitle,
                description: `Related to #${issueIid}`,
                labels: [
                    Labels_1.Labels.Platform_IOS,
                    Labels_1.Labels.Squad_Wallet,
                    Labels_1.Labels.Solution_PaymentsMobileIosWallet,
                    Labels_1.Labels.Round_1,
                    Labels_1.Labels.Regressive_NewFeature,
                    Labels_1.Labels.Tribe_Transactional
                ],
                milestone_id: ConfigManager_1.ConfigManager.getMilestoneId(),
                remove_source_branch: true
            };
            try {
                const response = yield axios_1.default.post(Constants_1.HttpConstants.mergeRequestEndpoint, data, { headers: Constants_1.HttpConstants.commomHeaders });
                console.log('Merge request created:', response.data);
            }
            catch (error) {
                console.error('There was an error creating the merge request:', error);
            }
        });
    }
    getRelatedIssueIid() {
        return __awaiter(this, void 0, void 0, function* () {
            const relatedIssueIid = CommandLineManager_1.CommandLineManager.extractParameter(MergeRequestParameter_1.MergeRequesParameters.RelatedIssue);
            if (relatedIssueIid) {
                return relatedIssueIid;
            }
            const title = CommandLineManager_1.CommandLineManager.extractParameter(MergeRequestParameter_1.MergeRequesParameters.IssueTitle);
            if (title) {
                const description = CommandLineManager_1.CommandLineManager.extractParameter(MergeRequestParameter_1.MergeRequesParameters.IssueDescription);
                let issueManager = new IssueManager_1.IssueManager();
                const issueData = yield issueManager.createIssue(title, description);
                return issueData === null || issueData === void 0 ? void 0 : issueData.iid;
            }
        });
    }
}
exports.MergeRequestManager = MergeRequestManager;
