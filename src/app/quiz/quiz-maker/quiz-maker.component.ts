import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../quiz.service';
import { ICategory } from 'src/app/shared/models';
import { Subscription } from 'rxjs';

import { VideoDemoComponent } from "../../shared/video-demo/video-demo.component";
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css']
})
export class QuizMakerComponent implements OnInit {

  userChoice: string;
  selectedCategoryId: number = 0 ;
  selectedDifficulty: string = '';
  hasSubCategories: boolean = false;

  subCategory: ICategory[];
  mainCategories: ICategory[];
  originalCategories: ICategory[];
  categoryWithSubCategories: ICategory[] = [
    {id:undefined,name:'Entertainment'},
    {id:undefined,name:'Science'}
  ];

  subs : Subscription;

  constructor(private QuizService: QuizService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.subs = this.QuizService.triviaCategories$.subscribe(data => {

      this.originalCategories = data;

      //this return only main categories
      this.mainCategories = this.originalCategories.filter(cat =>
        this.categoryWithSubCategories.every(subCat => {
          let regex = new RegExp(`^${subCat.name}:`);
          return !(cat.name.includes(subCat.name) && regex.test(cat.name))
        })
      ).concat(this.categoryWithSubCategories);

    });

  }

  onSelectedCategory(category: ICategory): void {

    let catWithSubCat: boolean = this.categoryWithSubCategories.some(cat => cat.name == category.name);

    if (catWithSubCat) {
      //get all sub categories for this main category
      this.hasSubCategories = true;
      this.subCategory = this.filterBySubCategory(category.name);
    } else {
      this.hasSubCategories = false;
      this.selectedCategoryId = category.id;
    }
  }

  onSelectedSubCategory(subCategory: ICategory): void {
    this.selectedCategoryId = subCategory.id;
  }

  onSelectedDifficulty(event: Event): void {
    const el = event.target as HTMLSelectElement;
    this.selectedDifficulty = el.value;
  }

  onCreateQuiz(): void {
    this.QuizService.userSelectedCategoryAndDifficulty(this.selectedCategoryId, this.selectedDifficulty);
    this.router.navigate(['/quizquestionlist']);
  }

  filterBySubCategory(filter: string): ICategory[]{

    let regex = new RegExp(`^${filter}:`);

    //this return only categories which have any sub-category
    return this.originalCategories.filter(mainCategories => mainCategories.name.includes(filter) && regex.test(mainCategories.name))
      .map(cat => ({
          ...cat,
          name: cat.name.slice(cat.name.indexOf(':')+2)
        })
      );
  }

  openDialog() {
    const dialogRef = this.dialog.open(VideoDemoComponent, {
      maxWidth: 'fit-content',
      position: {
        top: '28vh',
        left: '28vw'
      },
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
