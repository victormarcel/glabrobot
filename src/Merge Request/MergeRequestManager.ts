import axios, { AxiosResponse } from "axios";
import { CommandLineManager } from "../Commons/Command Line/CommandLineManager";
import { Labels } from "../Commons/Enums/Labels";
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
        const issueIid = await this.getRelatedIssueIid();
        const mrTitle = await GitManager.getCommitLastDescription() || "";
        const sourceBranch = await GitManager.getCurrentBranch() || "";

        const data: MergeRequestData = {
            assignee_id: ConfigManager.getAssigneeId(),
            reviewer_ids: ConfigManager.getReviewerIds(),
            source_branch: sourceBranch,
            target_branch: CommandLineManager.extractParameter(MergeRequesParameters.TargetBranch),
            title: mrTitle,
            description: `Related to #${issueIid}`,
            labels: [
                Labels.Platform_IOS,
                Labels.Squad_Wallet,
                Labels.Solution_PaymentsMobileIosWallet,
                Labels.Round_1,
                Labels.Regressive_NewFeature,
                Labels.Tribe_Transactional
            ],
            milestone_id: ConfigManager.getMilestoneId(),
            remove_source_branch: true
        };

        try {
            const response: AxiosResponse = await axios.post(HttpConstants.mergeRequestEndpoint, data, { headers: HttpConstants.commomHeaders });
            console.log('Merge request created:', response.data);
        } catch (error) {
            console.error('There was an error creating the merge request:', error);
        }
    }

    private async getRelatedIssueIid(): Promise<string | undefined> {

        const relatedIssueIid = CommandLineManager.extractParameter(MergeRequesParameters.RelatedIssue);

        if (relatedIssueIid) {
            return relatedIssueIid
        }

        const title = CommandLineManager.extractParameter(MergeRequesParameters.IssueTitle);
        if (title) {
            const description = CommandLineManager.extractParameter(MergeRequesParameters.IssueDescription);
            let issueManager = new IssueManager();
            const issueData = await issueManager.createIssue(title, description);

            return issueData?.iid
        }
    }
}