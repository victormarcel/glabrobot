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
exports.GitManager = void 0;
class GitManager {
    static getCurrentBranch() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.executeGitCommand('git branch --show-current');
        });
    }
    static getCommitLastDescription() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.executeGitCommand('git log -1 --pretty=%s');
        });
    }
    static executeGitCommand(command) {
        const { exec } = require('child_process');
        return new Promise((resolve, reject) => {
            exec(command, (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(stdout.trim());
                }
            });
        });
    }
}
exports.GitManager = GitManager;
