import {Author} from "../../facets/author/Author";
import {Typing} from "./Typing";

describe("Typing", () => {

    let typing: Typing;

    beforeEach(() => {
        typing = new Typing(new Author('', 'Bot'), 1);
    });
});