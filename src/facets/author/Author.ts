import {IAuthor} from "./IAuthor";

export class Author implements IAuthor {
    constructor(public avatar: string, public name: string) {
        
    }
}
