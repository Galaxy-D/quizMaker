import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit {

  @Input() score: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  getScoreClass(): string {
    switch (this.score) {
      case 0:
      case 1:
        return 'red';
      case 2:
      case 3:
        return 'yellow';
      case 4:
      case 5:
        return 'green';
      default:
        return '';
    }
  }

}
