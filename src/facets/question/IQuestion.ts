import {IScenario} from "../scenario/IScenario";
import {IRule} from "../rule/IRule";

export interface IQuestion {
    validate: Boolean;
    actions: Array<IScenario>;
    rules?: Array<IRule>;
    title: string;
    skip?: number;
    name: string;
}
