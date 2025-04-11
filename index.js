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
const GitManager_1 = require("./src/Commons/Git/GitManager");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let branch = yield GitManager_1.GitManager.getCommitLastDescription();
        console.log(branch);
        // const mainAction = CommandLineManager.getMainAction();
        // switch (mainAction) {
        //     case MergeRequestAction.Main: {
        //         const manager = new MergeRequestManager();
        //         manager.performAction();
        //         break;
        //     }
        //     case IssueAction.Main: {
        //         const manager = new IssueManager();
        //         manager.performAction();
        //         break;
        //     }
        //     default: {
        //         console.log(`GitLab Robot: command not found: ${mainAction}`)
        //     }
        // }
    });
}
main();
