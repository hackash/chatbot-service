import {Scenario} from "../../facets/scenario/Scenario";
import {Question} from "../../facets/question/Question";
import {Author} from "../../facets/author/Author";
import {Message} from "../message/Message";
import {Typing} from "../typing/Typing";
import {IBot} from "./IBot";

export class Bot implements IBot {

    public self: Author = {
        avatar: "/path/to/avatar.jpg",
        name: "Jarvis",
    };
    public user: Author = {
        avatar: "/path/to/avatar.jpg",
        name: "User",
    };

    public activeProcessIndex: number = 0;
    public processes: Array<Question> = [];
    public messages: Array<Message> = [];
    public typing: Typing;
    public data: any = {};

    private scenario: Scenario;
    private process: Question;

    constructor(public questions: Array<Question> = [], public scenarios: Array<Scenario> = []) {
    }

    public start(scenario?: Scenario): void {
        this.scenario = scenario = scenario ? scenario : this.scenarios[0];
        this.fillProcesses(scenario);
    }

    public addData(key: string, value: string): void {
        this.data[key] = value;
    }

    public answer(answer: any): void {
        this.next(answer);
    }

    private post(self: boolean, question: Question): void {
        if (self) {
            if (this.typing) {
                this.typing.destroy();
            }
            this.typing = new Typing(this.self);
            this.typing.schedule(() => {
                this.processPost(self, question);
            });
        } else {
            this.processPost(self, question);
        }
    }

    private processPost(self: boolean, question: Question): void {
        let msg = new Message(this.getAuthor(self), question.title, question.actions);
        if (question.skip) {
            setTimeout(this.next.bind(this), question.skip);
        }
        this.messages.push(msg);
    }

    private next(answer: any): void {
        if (answer) {
            this.addData(this.process.name, answer);
        }
        if (this.processes.length - 1 > this.activeProcessIndex) {
            this.activeProcessIndex++;
            this.startProcess(this.getActiveProcess());
        }
    }

    private startProcess(question: Question): void {
        this.process = question;
        this.post(true, question);
    }

    private getAuthor(self: boolean): Author {
        return self ? this.self : this.user;
    }

    private getActiveProcess(): Question {
        return this.processes[this.activeProcessIndex];
    }

    private fillProcesses(scenario: Scenario): void {
        scenario.processes.forEach((pr) => {
            this.processes.push(this.questions.find(qs => qs.name === pr));
        });
        this.startProcess(this.getActiveProcess());
    }
}
