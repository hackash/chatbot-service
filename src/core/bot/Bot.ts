import {Scenario} from "../../facets/scenario/Scenario";
import {Question} from "../../facets/question/Question";
import {Author} from "../../facets/author/Author";
import {Rule} from "../../facets/rule/Rule";
import {Message} from "../message/Message";
import {Typing} from "../typing/Typing";
import {Chat} from "../chat/Chat";
import {IBot} from "./IBot";

export class Bot implements IBot {

    public chat: Chat = new Chat(new Typing(this.self));
    public typingInterval: number = 100;

    public self: Author = new Author("/path/to/avatar.jpg", "Jambo");
    public user: Author = new Author("/path/to/avatar.jpg", "User");

    public activeProcessIndex: number = 0;
    public processes: Array<Question> = [];
    public scenario: Scenario;
    public data: any = {};

    private typingIntervalRef: any = null;
    private blocked: boolean;
    private process: Question;

    constructor(public questions: Array<Question> = [], public scenarios: Array<Scenario> = []) {
    }

    public start(scenario?: Scenario): void {
        if (scenario) {
            this.scenario = scenario;
            this.fillProcesses(this.scenario);
        } else {
            let scenarios = this.scenarios.filter(s => !s.isDone());
            if (scenarios && scenarios.length > 0) {
                this.scenario = scenarios[0];
                this.fillProcesses(this.scenario);
            }
        }
    }

    public addData(key: string, value: string): void {
        this.data[key] = value;
    }

    public answer(answer: any): void {
        if (!this.isBlocked()) {
            if (!this.conversationOver()) {
                this.next(answer);
            } else {
                this.appendMessage(new Message(this.getAuthor(false), answer), false);
            }
        }
    }

    public isBlocked(): boolean {
        return this.blocked;
    }

    private appendMessage(msg: Message, isBot: boolean, done?: Function): void {
        /* tslint:disable:no-empty */
        done = typeof done === "function" ? done : () => {
            };
        if (isBot) {
            this.simulateTyping(msg, done);
            return;
        }
        this.chat.appendMessage(msg, this.getActiveProcess());
        done();
    }

    private synchronized(sync: (done: Function) => void): void {
        this.blocked = true;
        sync(() => {
            this.blocked = false;
        });
    }

    private simulateTyping(msg: Message, done: Function): void {
        let textChunks = msg.text.split(" ");
        msg.flushText();
        this.typingIntervalRef = setInterval(() => {
            if (textChunks.length === 0) {
                this.chat.appendMessage(msg, this.getActiveProcess());
                clearInterval(this.typingIntervalRef);
                done();
            } else {
                msg.text += " " + textChunks.shift();
                this.chat.typing.ping();
            }
        }, this.typingInterval);
    }

    private processPost(self: boolean, question: Question): void {
        let msg = new Message(this.getAuthor(self), question.title, question.actions);
        this.appendMessage(msg, self, () => {
            if (question.skip) {
                this.synchronized((done: Function) => {
                    setTimeout(() => {
                        this.next();
                        done();
                    }, question.skip);
                });
            }
        });
    }

    private postErrors(errors: Array<string>): void {
        let text = errors.join(",");
        let errorMsg = new Message(this.getAuthor(true), text);
        this.appendMessage(errorMsg, true);
    }

    private next(answer?: any): void {
        if (answer) {
            let userMsg = new Message(this.getAuthor(false), answer);
            let errors = this.isValidAnswer(answer);
            this.appendMessage(userMsg, false, () => {
                if (errors.length === 0) {
                    this.addData(this.process.name, answer);
                } else {
                    this.postErrors(errors);
                    return;
                }
            });
        }
        if (!this.scenarioOver()) {
            this.activeProcessIndex++;
            this.startProcess(this.getActiveProcess());
        } else {
            this.activeProcessIndex = 0;
            this.scenario.markAsDone();
            this.start();
        }
    }

    private isValidAnswer(answer: any): Array<string> {
        let errors: Array<string> = [];
        let qs: Question = this.getActiveProcess();
        if (qs.validate && qs.rules.length > 0) {
            qs.rules.forEach((rule: Rule) => {
                if (rule.expression instanceof RegExp) {
                    if (!rule.expression.test(answer)) {
                        errors.push(rule.message);
                    }
                } else if (typeof rule.expression === "function") {
                    if (!rule.expression(answer)) {
                        errors.push(rule.message);
                    }
                }
            });
        }
        return errors;
    }

    private conversationOver(): boolean {
        let scenarios = this.scenarios.filter(s => !s.isDone());
        // tslint:disable-next-line
        console.log('scenarios', scenarios);
        return !scenarios || scenarios.length === 0;
    }

    private scenarioOver(): boolean {
        return this.processes.length - 1 <= this.activeProcessIndex;
    }

    private startProcess(question: Question): void {
        this.process = question;
        this.processPost(true, question);
    }

    private getAuthor(self: boolean): Author {
        return self ? this.self : this.user;
    }

    private getActiveProcess(): Question {
        return this.processes[this.activeProcessIndex];
    }

    private fillProcesses(scenario: Scenario): void {
        this.processes = [];
        scenario.processes.forEach((pr) => {
            this.processes.push(this.questions.find(qs => qs.name === pr));
        });
        this.startProcess(this.getActiveProcess());
    }
}
