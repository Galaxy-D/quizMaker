import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { tap, catchError, shareReplay, map, concatMap } from 'rxjs/operators';
import { IQuestion, TriviaCategory, TriviaResponse } from '../shared/index';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private triviaCategoriesUrl = 'https://opentdb.com/api_category.php';
  private triviaQuestionsUrl = 'https://opentdb.com/api.php';

  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  private difficultySelectedSubject = new BehaviorSubject<string>('');
  difficultySelectedAction$ = this.difficultySelectedSubject.asObservable();

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
    this.categorySelectedAction$,
    this.difficultySelectedAction$
  ]).pipe(
      tap((data) => console.log('Actions Data Stream ', data)),
      concatMap(([selectedCategoryId, selectedCategoryType]): Observable<IQuestion[]> => {
          return this.http.get<TriviaResponse>(`${this.triviaQuestionsUrl}?amount=5&category=${selectedCategoryId}&difficulty=${selectedCategoryType}&type=multiple`)
          .pipe(map(response => response.results));
      }),
      catchError(this.handleError)
    );

  userSelectedCategoryAndDifficulty(categoryId: number, difficultyType: string): void {
    this.categorySelectedSubject.next(categoryId);
    this.difficultySelectedSubject.next(difficultyType);
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
