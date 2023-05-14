import { Component, OnInit } from '@angular/core';
import { IAnswer, ResponseStatus } from '../../shared/index';
import { QuizService } from '../quiz.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'quiz-question-list',
  templateUrl: './quiz-question-list.component.html',
  styleUrls: ['./quiz-question-list.component.css']
})
export class QuizQuestionListComponent implements OnInit {

  // userResponses = <IAnswer>{};
  userResponses: Record<string,ResponseStatus> = {}
  finalScore: number = 0;
  submited: boolean = false;
  hasUserAnwseredAllQuestions: boolean = false;

  constructor(private QuizService: QuizService) { }

  filtredQuestions$ = this.QuizService.filtredTriviaQuestions$
  .pipe(
    tap((data) => console.log('filtred Questions :', data)),
    map((data) => data),
    );

  ngOnInit(): void {
  }

  getUserAnswer([question,answerStatus]: [string, number]): void {
    this.userResponses[question] = answerStatus;
    this.hasUserAnwseredAllQuestions = Object.keys(this.userResponses).length === 5;
  }

  getFinalScore(): void {
    this.finalScore = Object.values(this.userResponses).reduce((acc, cur) => acc + cur, 0);
  }

  onSubmit(): void {
    this.submited = true;
    this.getFinalScore();
  }

}
