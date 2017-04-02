import {Author} from "../../facets/author/Author";
import {Typing} from "./Typing";

describe("Typing", () => {

    let typing: Typing;

    beforeEach(() => {
        typing = new Typing(new Author('', 'Bot'), 1);
    });

    it("Should start typing", (done) => {
        typing.onStart = () => {
            expect(typing.isInProgress).toBeTruthy();
            done();
        };
        typing.schedule(() => {});
    });

    it("Should destroy typing", (done) => {
        typing.onDone = () => {
            expect(typing.isInProgress).toBeFalsy();
            done();
        };
        typing.schedule(() => {});
    });
});