import { NgModule } from '@angular/core';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizMakerComponent } from './quiz-maker/quiz-maker.component';
import { QuizQuestionComponent } from './quiz-question/quiz-question.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { QuizResetterComponent } from './quiz-resetter/quiz-resetter.component';
import { QuizQuestionListComponent } from './quiz-question-list/quiz-question-list.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    QuizMakerComponent,
    QuizQuestionComponent,
    QuizResultComponent,
    QuizResetterComponent,
    QuizQuestionListComponent
  ],
  imports: [
    SharedModule,
    QuizRoutingModule
  ]
})
export class QuizModule { }
