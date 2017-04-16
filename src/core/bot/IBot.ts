import {IQuestion} from "../../facets/question/IQuestion";
import {IScenario} from "../../facets/scenario/IScenario";
import {IAuthor} from "../../facets/author/IAuthor";
import {IChat} from "../chat/IChat";

export interface IBot {
    typingInterval: number;
    activeProcessIndex: number;
    processes: Array<IQuestion>;
    self: IAuthor;
    user: IAuthor;
    data: any;
    chat: IChat,
    addData(key: string, value: string): void;
    start(scenario: IScenario): void;
    answer(answer: any): void;
    isBlocked(): boolean;
}

