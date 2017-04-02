import {IAuthor} from "../../facets/author/IAuthor";

export interface ITyping {
    isInProgress: Boolean;
    interval?: number;
    member: IAuthor;
    schedule(callback: Function): void;
    destroy(): void;
    onStart(): void;
    onDone(): void;
}
