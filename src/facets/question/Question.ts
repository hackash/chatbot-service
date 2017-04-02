import {IQuestion} from "./IQuestion";
import {Rule} from "../rule/Rule";

export class Question implements IQuestion {
    rules?: Array<Rule>;
    actions: Array<any>;
    validate: Boolean;
    title: string;
    name: string;
    skip: number;
}
