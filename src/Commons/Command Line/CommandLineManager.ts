enum CommandLineParameter {
    MainAction = "glabrobot",
}

const args = process.argv.slice(2);

export class CommandLineManager {

    static getMainAction(): string {
        return this.extractParameter(CommandLineParameter.MainAction);
    }

    static extractParameter(parameter: string): string {
        let parameterIndex = args.indexOf(parameter) + 1
        return args[parameterIndex]
    }
}