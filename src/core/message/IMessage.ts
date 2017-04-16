import {IScenario} from "../../facets/scenario/IScenario";
import {IAuthor} from "../../facets/author/IAuthor";

export interface IMessage {
    actions?: Array<IScenario>;
    timestamp: number;
    author: IAuthor;
    text: string;
    flushText(): void;
}
