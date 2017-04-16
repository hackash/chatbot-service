import {IQuestion} from "../../facets/question/IQuestion";
import {IMessage} from "../message/IMessage";
import {ITyping} from "../typing/ITyping";

export interface IChat {
    typing: ITyping;
    messages: Array<IMessage>;
    onBotPost(question: IQuestion, message: IMessage): void;
}

