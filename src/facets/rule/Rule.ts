import {IRule} from "./IRule";

export class Rule implements IRule {
    message: string;
    expression: RegExp;
}
