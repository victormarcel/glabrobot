"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLineManager = void 0;
var CommandLineParameter;
(function (CommandLineParameter) {
    CommandLineParameter["MainAction"] = "glabrobot";
})(CommandLineParameter || (CommandLineParameter = {}));
const args = process.argv.slice(2);
class CommandLineManager {
    static getMainAction() {
        return this.extractParameter(CommandLineParameter.MainAction);
    }
    static extractParameter(parameter) {
        let parameterIndex = args.indexOf(parameter) + 1;
        return args[parameterIndex];
    }
}
exports.CommandLineManager = CommandLineManager;
