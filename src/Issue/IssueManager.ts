import axios from "axios";
import { HttpConstants } from "../Commons/Constants";
import { CommandLineManager } from "../Commons/Command Line/CommandLineManager";
import { IssueAction } from "./Models/IssueAction";
import { Labels } from "../Commons/Enums/Labels";
import { ConfigManager } from "../Commons/Config/ConfigManager";
import { IssueParameter } from "./Models/IssueParameter";

export class IssueManager {

    async performAction() {
        let issueAction = CommandLineManager.extractParameter(IssueAction.Main);
        switch (issueAction) {
            case IssueAction.Create: {
                this.createIssue(
                    CommandLineManager.extractParameter(IssueParameter.Title), 
                    CommandLineManager.extractParameter(IssueParameter.Description)
                );
                break;
            }
            case IssueAction.List: {
                this.fetchIssues();
                break;
            }
            default: {
                console.log(`GitLab Robot: Issue command not found: ${issueAction}`)
            }
        }
    }

    async createIssue(title: string, description: string): Promise<Record<string, any> | undefined> {
        const data = {
            assignee_id: ConfigManager.getAssigneeId(),
            milestone_id: ConfigManager.getMilestoneId(),
            title: title,
            description: description,
            epic_id: CommandLineManager.extractParameter(IssueParameter.EpicId),
            weight: CommandLineManager.extractParameter(IssueParameter.Weight),
            labels: [
                Labels.Platform_IOS,
                Labels.Priority_Medium,
                Labels.Product_Pfj,
                Labels.Solution_PaymentsMobileIosWallet,
                Labels.Squad_Wallet,
                Labels.Type_Task,
                Labels.Workflow_New
            ]
        };

        try {
            const response = await axios.post(HttpConstants.issueEndpoint, data, { headers: HttpConstants.commomHeaders });
            return response.data
        } catch (error) {
            console.error('There was an error making the request:', error);
        }
    }

    async fetchIssues() {
        try {
            const response = await axios.get(HttpConstants.issueEndpoint, { headers: HttpConstants.commomHeaders });
            console.log(response.data);
        } catch (error) {
            console.error('There was an error making the request:', error);
        }
    }
}