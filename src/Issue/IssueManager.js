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
exports.IssueManager = void 0;
const axios_1 = __importDefault(require("axios"));
const Constants_1 = require("../Commons/Constants");
const CommandLineManager_1 = require("../Commons/Command Line/CommandLineManager");
const IssueAction_1 = require("./Models/IssueAction");
const ConfigManager_1 = require("../Commons/Config/ConfigManager");
const IssueParameter_1 = require("./Models/IssueParameter");
class IssueManager {
    performAction() {
        return __awaiter(this, void 0, void 0, function* () {
            let issueAction = CommandLineManager_1.CommandLineManager.extractParameter(IssueAction_1.IssueAction.Main);
            switch (issueAction) {
                case IssueAction_1.IssueAction.Create: {
                    this.createIssue(CommandLineManager_1.CommandLineManager.extractParameter(IssueParameter_1.IssueParameter.Title) || "", CommandLineManager_1.CommandLineManager.extractParameter(IssueParameter_1.IssueParameter.Description) || "");
                    break;
                }
                case IssueAction_1.IssueAction.List: {
                    this.fetchIssues();
                    break;
                }
                default: {
                    console.log(`GitLab Robot: Issue command not found: ${issueAction}`);
                }
            }
        });
    }
    createIssue(title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                assignee_id: ConfigManager_1.ConfigManager.getAssigneeId(),
                milestone_id: CommandLineManager_1.CommandLineManager.extractParameter(IssueParameter_1.IssueParameter.Milestone),
                title: title,
                description: description,
                epic_id: CommandLineManager_1.CommandLineManager.extractParameter(IssueParameter_1.IssueParameter.EpicId),
                weight: CommandLineManager_1.CommandLineManager.extractParameter(IssueParameter_1.IssueParameter.Weight),
                labels: (CommandLineManager_1.CommandLineManager.extractParameter(IssueParameter_1.IssueParameter.Labels) || "").split(",")
            };
            try {
                const response = yield axios_1.default.post(Constants_1.HttpConstants.issueEndpoint, data, { headers: Constants_1.HttpConstants.commomHeaders });
                console.log('Issue created:', response.data);
                return response.data;
            }
            catch (error) {
                console.error('There was an error making the request:', error);
            }
        });
    }
    fetchIssues() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(Constants_1.HttpConstants.issueEndpoint, { headers: Constants_1.HttpConstants.commomHeaders });
                console.log(response.data);
            }
            catch (error) {
                console.error('There was an error making the request:', error);
            }
        });
    }
}
exports.IssueManager = IssueManager;
