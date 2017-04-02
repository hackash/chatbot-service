import {Author} from "../../facets/author/Author";
import {ITyping} from "./ITyping";

export class Typing implements ITyping {

    public isInProgress: Boolean;
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
            callback();
            this.destroy();
        }, this.interval);
    }

    public destroy(): void {
        if (this.timer) {
            clearTimeout(this.timer);
            this.isInProgress = false;
        }
    };

}
