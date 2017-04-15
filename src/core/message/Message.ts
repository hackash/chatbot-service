import {Scenario} from "../../facets/scenario/Scenario";
import {Author} from "../../facets/author/Author";
import {IMessage} from "./IMessage";

export class Message implements IMessage {
    public timestamp: number;

    constructor(public author: Author, public text: string, public actions?: Array<Scenario>) {
        this.timestamp = new Date().getTime();
    }
}
