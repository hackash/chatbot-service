import {Scenario} from "../../facets/scenario/Scenario";
import {Author} from "../../facets/author/Author";
import {IMessage} from "./IMessage";

export class Message implements IMessage {
    constructor(public author: Author, public text: string, public actions?: Array<Scenario>) {
    }
}
