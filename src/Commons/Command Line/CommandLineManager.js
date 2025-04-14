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
        return args[0];
    }
    static extractParameter(parameter) {
        let parameterIndex = args.indexOf(parameter);
        if (parameterIndex >= 0) {
            return args[parameterIndex + 1];
        }
    }
}
exports.CommandLineManager = CommandLineManager;
