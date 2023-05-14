import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizMakerComponent } from './quiz-maker/quiz-maker.component';
import { QuizQuestionListComponent } from './quiz-question-list/quiz-question-list.component';


const routes: Routes = [
  {path: 'quizmaker', component: QuizMakerComponent},
  {path: 'quizquestionlist', component: QuizQuestionListComponent},
  {path: '', redirectTo: 'quizmaker', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
