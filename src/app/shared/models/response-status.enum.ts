
export enum ResponseStatus {
  wrong = 0,
  correct = 1,
}

export interface IAnswer {
  question: string;
  answerStatus: ResponseStatus;
}
