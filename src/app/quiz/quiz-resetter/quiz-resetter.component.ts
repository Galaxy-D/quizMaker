import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'quiz-resetter',
  templateUrl: './quiz-resetter.component.html',
  styleUrls: ['./quiz-resetter.component.css']
})
export class QuizResetterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  createNewQuiz(): void {
    this.router.navigate(['/quizmaker']);
  }

}
