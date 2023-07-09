import { Component, OnInit } from '@angular/core';
import { IQuestion, ResponseStatus } from '../../shared/models';
import { QuizService } from '../quiz.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'quiz-question-list',
  templateUrl: './quiz-question-list.component.html',
  styleUrls: ['./quiz-question-list.component.css']
})
export class QuizQuestionListComponent implements OnInit {

  finalScore: number = 0;
  submited: boolean = false;
  hasUserChangedAnyQuestions: boolean = false;
  hasUserAnwseredAllQuestions: boolean = false;

  subs: Subscription[] = [];
  filtredQuestions:IQuestion[];
  userResponses: Record<string,ResponseStatus> = {}

  constructor(private QuizService: QuizService) { }

  ngOnInit(): void {
    this.subs.push(
      this.QuizService.filtredTriviaQuestions$.subscribe(result => this.filtredQuestions = result)
    );
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

  handleChangedQuestion(oldQst:string){
    this.hasUserChangedAnyQuestions = true;
    this.subs.push(
      this.QuizService.updateTriviaQuestions$.subscribe(newQuestion => {
        this.filtredQuestions = this.filtredQuestions.map(el => el.question === oldQst ? newQuestion[0] : el);
      })
    );
  }

  questionTrackBy(index: number, item: IQuestion): string {
    return item.question;
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

}
