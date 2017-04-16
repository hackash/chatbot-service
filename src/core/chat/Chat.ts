import {Question} from "../../facets/question/Question";
import {Message} from "../message/Message";
import {IChat} from "./IChat";
import {Typing} from "../typing/Typing";

export class Chat implements IChat {

    public messages: Array<Message> = [];

    constructor(public typing: Typing) {
    }

    public onBotPost(question: Question, message: Message): void {
        // todo override if necessary
    }

    public appendMessage(msg: Message, question: Question): void {
        this.messages.push(msg);
        this.onBotPost(question, msg);
    }
}
