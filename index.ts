import { CommandLineManager } from './src/Commons/Command Line/CommandLineManager';
import { IssueManager } from './src/Issue/IssueManager';
import { MergeRequestAction } from './src/Merge Request/Models/MergeRequestAction';
import { IssueAction } from './src/Issue/Models/IssueAction';
import { MergeRequestManager } from './src/Merge Request/MergeRequestManager';

async function main() {
    const mainAction = CommandLineManager.getMainAction();

    switch (mainAction) {
        case MergeRequestAction.Main: {
            const manager = new MergeRequestManager();
            manager.performAction();
            break;
        }
        case IssueAction.Main: {
            const manager = new IssueManager();
            manager.performAction();
            break;
        }
        default: {
            console.log(`GitLab Robot: command not found: ${mainAction}`)
        }
    }
}

main()