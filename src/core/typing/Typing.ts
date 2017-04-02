import {Author} from "../../facets/author/Author";
import {ITyping} from "./ITyping";

export class Typing implements ITyping {

    public isInProgress: Boolean = false;
    private timer: any = null;

    constructor(public member: Author, public interval?: number) {
        this.interval = interval || 2000;
    }

    public schedule(callback: Function): void {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.isInProgress = true;
        this.timer = setTimeout(() => {
            this.destroy();
            callback();
        }, this.interval);
        this.onStart();
    }

    public destroy(): void {
        if (this.timer) {
            clearTimeout(this.timer);
            this.isInProgress = false;
            this.onDone();
        }
    };

    public onStart(): void {
        // todo override if necessary
    }

    public onDone(): void {
        // todo override if necessary
    }

}
