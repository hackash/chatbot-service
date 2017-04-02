import {IScenario} from "./IScenario";

export class Scenario implements IScenario {
    name: string;
    processes: Array<string>;
}
