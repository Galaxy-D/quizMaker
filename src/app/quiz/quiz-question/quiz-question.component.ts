import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { IQuestion, ResponseStatus } from 'src/app/shared/index';

@Component({
  selector: 'quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css']
})
export class QuizQuestionComponent implements OnInit {

  @Input() question: IQuestion;
  @Input() canHighlight: boolean = false;
  @Output() userAnswer = new EventEmitter<[string, ResponseStatus]>();

  possibleAnswers: string[] = [];
  selectedAnswer: string = '';
  isQuestionAnswered: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.shuffledAnwsers();
  }

  private shuffledAnwsers(): void {
    this.possibleAnswers = [...this.question.incorrect_answers, this.question.correct_answer].sort(() => 0.5 - Math.random());
  }

  private isUserAnswerCorrect(): boolean {
    return this.question.correct_answer === this.selectedAnswer;
  }

  onSelectAnswer(answer: string): void {
    this.selectedAnswer = answer;
    this.userAnswer.emit([this.question.question, this.isUserAnswerCorrect() ? ResponseStatus.correct : ResponseStatus.wrong]);
  }

}
