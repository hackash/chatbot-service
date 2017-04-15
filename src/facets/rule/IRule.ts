export declare type  Validator = (answer: any) => boolean;

export interface IRule {
    message: string;
    expression: RegExp | Validator;
}
