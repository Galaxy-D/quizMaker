import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { IQuestion, ResponseStatus } from 'src/app/shared/models';

@Component({
  selector: 'quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css']
})
export class QuizQuestionComponent implements OnInit {

  selectedAnswer: string = '';
  possibleAnswers: string[] = [];
  isQuestionAnswered: boolean = false;

  @Input() question: IQuestion;
  @Input() isQuizSubmitted: boolean = false;
  @Input() hasUserChangedQuestion: boolean = false;

  @Output() questionChanged = new EventEmitter<string>();
  @Output() userAnswer = new EventEmitter<[string, ResponseStatus]>();

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

  onUserChangedQuestion():void{
    this.hasUserChangedQuestion = true;
    this.questionChanged.emit(this.question.question);
  }

}
