import {IQuestion} from "../../facets/question/IQuestion";
import {IScenario} from "../../facets/scenario/IScenario";
import {IAuthor} from "../../facets/author/IAuthor";
import {IMessage} from "../message/IMessage";
import {ITyping} from "../typing/ITyping";

export interface IBot {
    activeProcessIndex: number;
    processes: Array<IQuestion>;
    messages: Array<IMessage>;
    typing: ITyping;
    self: IAuthor;
    user: IAuthor;
    data: any;
    addData(key: string, value: string): void;
    start(scenario: IScenario): void;
    answer(answer: any): void;
    onBotPost(question: IQuestion, message: IMessage): void;
    isBlocked(): boolean;
}

