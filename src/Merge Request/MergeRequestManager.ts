import axios, { AxiosResponse } from "axios";
import { CommandLineManager } from "../Commons/Command Line/CommandLineManager";
import { MergeRequestData } from "./Models/MergeRequestData";
import { HttpConstants } from "../Commons/Constants";
import { MergeRequestAction } from "./Models/MergeRequestAction";
import { IssueManager } from "../Issue/IssueManager";
import { ConfigManager } from "../Commons/Config/ConfigManager";
import { MergeRequesParameters } from "./Models/MergeRequestParameter";
import { GitManager } from "../Commons/Git/GitManager";

export class MergeRequestManager {

    async performAction() {
        let mrAction = CommandLineManager.extractParameter(MergeRequestAction.Main);
        switch (mrAction) {
            case MergeRequestAction.Create: {
                this.createMergeRequest();
                break;
            }
            default: {
                console.log(`GitLab Robot: Merge request command not found: ${mrAction}`)
            }
        }
    }

    private async createMergeRequest(): Promise<void> {
        const title = await GitManager.getCommitLastDescription() || "";
        const description = await this.createDescriptionByExistingIssue() || "";
        const sourceBranch = await GitManager.getCurrentBranch() || "";
        const targetBranch = CommandLineManager.extractParameter(MergeRequesParameters.TargetBranch)

        if (targetBranch) {
            const data: MergeRequestData = {
                assignee_id: ConfigManager.getAssigneeId(),
                reviewer_ids: ConfigManager.getReviewerIds(),
                source_branch: sourceBranch,
                target_branch: targetBranch,
                title: title,
                description: description,
                labels: (CommandLineManager.extractParameter(MergeRequesParameters.Labels) || "").split(","),
                milestone_id: parseInt(CommandLineManager.extractParameter(MergeRequesParameters.Milestone) || ""),
                remove_source_branch: true
            };
    
            try {
                const response: AxiosResponse = await axios.post(HttpConstants.mergeRequestEndpoint, data, { headers: HttpConstants.commomHeaders });
                console.log('Merge request created:', response.data);
            } catch (error) {
                console.error('There was an error creating the merge request:', error);
            }
        }
    }

    private async createDescriptionByExistingIssue(): Promise<string | undefined> {
        const relatedIssueIid = await this.getRelatedIssueIid()
        if (relatedIssueIid) {
            const relatedIssue = CommandLineManager.extractParameter(MergeRequesParameters.RelatedIssue)
            const issueToClose = CommandLineManager.extractParameter(MergeRequesParameters.IssueToClose)
            
            if (relatedIssue) {
                return `Related to #${relatedIssueIid}`
            } else if (issueToClose) {
                return `Closes #${relatedIssueIid}`
            }
        }
    }

    private async getRelatedIssueIid(): Promise<string | undefined> {
        const existingIssueIid = CommandLineManager.extractParameter(MergeRequesParameters.RelatedIssue) || CommandLineManager.extractParameter(MergeRequesParameters.IssueToClose);

        if (existingIssueIid) {
            return existingIssueIid
        }

        const title = CommandLineManager.extractParameter(MergeRequesParameters.IssueTitle);
        if (title) {
            const description = CommandLineManager.extractParameter(MergeRequesParameters.IssueDescription) || "";
            let issueManager = new IssueManager();
            const issueData = await issueManager.createIssue(title, description);

            return issueData?.iid
        }
    }
}