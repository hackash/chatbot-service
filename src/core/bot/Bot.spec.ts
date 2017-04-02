"use strict";

import 'jest';
require("babel-core/register");
require("babel-polyfill");

import {Bot} from "./Bot";

describe("Bot", () => {
    it("Should be pass sanity", () => {
        expect(typeof Bot).toBe("function");
    });

    it("Should be able to create new instance", () => {
        expect(typeof new Bot()).toBe("object");
    });
});
