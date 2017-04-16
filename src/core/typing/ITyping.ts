import {IAuthor} from "../../facets/author/IAuthor";

export interface ITyping {
    active: Boolean;
    interval?: number;
    member: IAuthor;
    ping(): void;
    destroy(): void;
    onStart(member: IAuthor): void;
    onEnd(member: IAuthor): void;
    onPing(member: IAuthor): void;
}
