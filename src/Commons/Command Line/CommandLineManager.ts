enum CommandLineParameter {
    MainAction = "glabrobot",
}

const args = process.argv.slice(2);

export class CommandLineManager {

    static getMainAction(): string | undefined {
        return args[0]
    }

    static extractParameter(parameter: string): string | undefined {
        let parameterIndex = args.indexOf(parameter)
        if (parameterIndex >= 0) {
            return args[parameterIndex + 1]
        }
    }
}