export type Difficulity = 'easy' | 'medium' | 'hard';

export interface IQuestion {
  category: string;
  type: 'multiple';
  difficulty: Difficulity;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface TriviaResponse {
  response_code: number;
  results: IQuestion[];
}
