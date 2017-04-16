import {Author} from "../../facets/author/Author";
import {ITyping} from "./ITyping";

export class Typing implements ITyping {

    public active: Boolean = false;
    private timer: any = null;

    constructor(public member: Author, public interval: number = 1000) {
    }

    public ping(): void {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        if (!this.active) {
            this.active = true;
            this.onStart(this.member);
        }
        this.timer = setTimeout(() => {
            this.destroy();
        }, this.interval);
    }

    public destroy(): void {
        if (this.timer) {
            clearTimeout(this.timer);
            this.active = false;
            this.onEnd(this.member);
        }
    };

    public onStart(member: Author): void {
        // todo override if necessary
    }

    public onPing(member: Author): void {
        // todo override if necessary
    }

    public onEnd(member: Author): void {
        // todo override if necessary
    }
}
