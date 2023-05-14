import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css']
})
export class QuizMakerComponent implements OnInit {

  selectedCategoryId: number = 0 ;
  selectedDifficulty: string = '';

  constructor(private QuizService: QuizService, private router: Router) { }

  categories$ = this.QuizService.triviaCategories$;

  ngOnInit(): void {
  }

  onSelectedCategory(event: Event): void {
    const el = event.target as HTMLSelectElement;
    this.selectedCategoryId = +el.value;
  }

  onSelectedDifficulty(event: Event): void {
    const el = event.target as HTMLSelectElement;
    this.selectedDifficulty = el.value;
  }

  onCreateQuiz(): void {
    this.QuizService.userSelectedCategoryAndDifficulty(this.selectedCategoryId, this.selectedDifficulty);
    this.router.navigate(['/quizquestionlist']);
  }
}
