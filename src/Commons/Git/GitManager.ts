import { ExecException } from 'child_process';

export class GitManager {

    static async getCurrentBranch(): Promise<string | undefined> {
        return this.executeGitCommand('git branch --show-current');
    }

    static async getCommitLastDescription(): Promise<string | undefined> {
        return this.executeGitCommand('git log -1 --pretty=%s');
    }

    static executeGitCommand(command: string): Promise<string | undefined> {
        const { exec } = require('child_process');
        return new Promise<string | undefined>((resolve, reject) => {
            exec(command, (err: ExecException | null, stdout: string, stderr: string) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(stdout.trim());
                }
            });
        });
    }
}