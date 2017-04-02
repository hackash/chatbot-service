"use strict";

import 'jest';
require("babel-core/register");
require("babel-polyfill");

import {Bot} from "./Bot";
import {Question} from "../../facets/question/Question";
import {Scenario} from "../../facets/scenario/Scenario";

let questions: Array<Question> = [
    {
        validate: false,
        actions: [],
        title: 'Hey how is it going ?',
        skip: 2000,
        name: 'feeling'
    },
    {
        validate: false,
        actions: [],
        title: 'Hey how is your life ?',
        name: 'life'
    }
];

let scenarios: Array<Scenario> = [
    {
        name: 'sayHi',
        processes: [
            'feeling',
            'life'
        ]
    }
];

describe("Bot", () => {

    let bot: Bot;

    beforeEach(() => {
        bot = new Bot(questions, scenarios);
    });

    describe("Initialization", () => {
        it("Should be pass sanity", () => {
            expect(typeof Bot).toBe("function");
        });

        it("Should be able to create new bot instance", () => {
            expect(typeof bot).toBe("object");
        });
    });

    describe('Start', () => {
        it("Should start the process with 1st scenario", () => {
            bot.start();
            expect(bot.scenario.name).toBe(scenarios[0].name);
        });

        it("Should start the process with provided scenario", () => {
            bot.start(scenarios[0]);
            expect(bot.scenario.name).toBe(scenarios[0].name);
        });

        it("Should fill processes", () => {
            bot.start();
            expect(bot.processes.length).toBe(scenarios[0].processes.length);
        });

        it("Should set active process index", () => {
            bot.start();
            expect(bot.activeProcessIndex).toBe(0);
        });
    });


    describe("Message posting", () => {
        it("Should post the first question", () => {
            bot.start();
            bot.typing.onDone = () => {
                expect(bot.messages.length).toBeGreaterThan(0);
                done();
            };
        });

        it("Should accept an answer", () => {
            bot.start();
            bot.typing.onDone = () => {
                expect(bot.messages.length).toBeGreaterThan(0);
                done();
            };
        });
    });

});
