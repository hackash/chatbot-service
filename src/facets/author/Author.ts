import {IAuthor} from "./IAuthor";

export class Author implements IAuthor {
    public avatar: string;
    public name: string;

    constructor(avatar?: string, name?: string) {
        this.avatar = avatar;
        this.name = name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setAvatar(path: string): void {
        this.avatar = path;
    }
}
