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
Object.defineProperty(exports, "__esModule", { value: true });
const CommandLineManager_1 = require("./src/Commons/Command Line/CommandLineManager");
const IssueManager_1 = require("./src/Issue/IssueManager");
const MergeRequestAction_1 = require("./src/Merge Request/Models/MergeRequestAction");
const IssueAction_1 = require("./src/Issue/Models/IssueAction");
const MergeRequestManager_1 = require("./src/Merge Request/MergeRequestManager");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const mainAction = CommandLineManager_1.CommandLineManager.getMainAction();
        switch (mainAction) {
            case MergeRequestAction_1.MergeRequestAction.Main: {
                const manager = new MergeRequestManager_1.MergeRequestManager();
                manager.performAction();
                break;
            }
            case IssueAction_1.IssueAction.Main: {
                const manager = new IssueManager_1.IssueManager();
                manager.performAction();
                break;
            }
            default: {
                console.log(`GitLab Robot: command not found: ${mainAction}`);
            }
        }
    });
}
main();
