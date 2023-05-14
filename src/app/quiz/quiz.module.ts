import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizMakerComponent } from './quiz-maker/quiz-maker.component';
import { QuizQuestionComponent } from './quiz-question/quiz-question.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { QuizResetterComponent } from './quiz-resetter/quiz-resetter.component';
import { UnescapePipe } from 'src/app/shared/index';
import { QuizQuestionListComponent } from './quiz-question-list/quiz-question-list.component';


@NgModule({
  declarations: [
    QuizMakerComponent,
    QuizQuestionComponent,
    QuizResultComponent,
    QuizResetterComponent,
    UnescapePipe,
    QuizQuestionListComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule
  ]
})
export class QuizModule { }
