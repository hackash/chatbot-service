import {IScenario} from "./IScenario";

export class Scenario implements IScenario {

    private done: boolean = false;

    constructor(public name: string, public processes: Array<string>) {
    }

    public markAsDone(): void {
        this.done = true;
    }

    public isDone(): boolean {
        return this.done;
    }
}
