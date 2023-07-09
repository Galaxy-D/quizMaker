import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { tap, catchError, shareReplay, map, concatMap } from 'rxjs/operators';
import { IQuestion, TriviaCategory, TriviaResponse } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private triviaCategoriesUrl = 'https://opentdb.com/api_category.php';
  private triviaQuestionsUrl = 'https://opentdb.com/api.php';

  private selectedCategorySubject = new BehaviorSubject<number>(0);
  selectedCategoryAction$ = this.selectedCategorySubject.asObservable();

  private selectedDifficultySubject = new BehaviorSubject<string>('');
  selectedDifficultyAction$ = this.selectedDifficultySubject.asObservable();

  constructor(private http: HttpClient) {}

  triviaCategories$ = this.http
    .get<TriviaCategory>(this.triviaCategoriesUrl)
    .pipe(
      tap((data) => console.log('Categories Results', data.trivia_categories)),
      map((data) => data.trivia_categories),
      shareReplay(1),
      catchError(this.handleError)
    );

    filtredTriviaQuestions$ = combineLatest([
      this.selectedCategoryAction$,
      this.selectedDifficultyAction$
    ]).pipe(
        concatMap(([selectedCategoryId, selectedDifficulty]) => {
            return this.getTriviaQuestions(5,selectedCategoryId,selectedDifficulty);
        }),
        catchError(this.handleError)
      );

    updateTriviaQuestions$ = combineLatest([
      this.selectedCategoryAction$,
      this.selectedDifficultyAction$
    ]).pipe(
        concatMap(([selectedCategoryId, selectedDifficulty]) => {
            return this.getTriviaQuestions(1,selectedCategoryId,selectedDifficulty);
        }),
        catchError(this.handleError)
      );

  userSelectedCategoryAndDifficulty(categoryId: number, difficultyType: string): void {
    this.selectedCategorySubject.next(categoryId);
    this.selectedDifficultySubject.next(difficultyType);
  }

  getTriviaQuestions(questionAmont: number, CategoryId:number, difficulty:string): Observable<IQuestion[]>{
    return this.http.get<TriviaResponse>(`${this.triviaQuestionsUrl}?amount=${questionAmont}&category=${CategoryId}&difficulty=${difficulty}&type=multiple`)
    .pipe(
      map(response => response.results));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}
