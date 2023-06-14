import { Injectable } from '@angular/core';
import { HeroInterface } from '../interface/hero.interface';
import { catchError, Observable, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  // getHeroes(): Observable<HeroInterface[]> {
  //   const heroes = of(HEROES);
  //   this.messageService.add('HeroService: fetched heroes');
  //   return heroes;
  // }

  getHeroes(): Observable<HeroInterface[]> {
    return this.http.get<HeroInterface[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<HeroInterface[]>('getHeroes', [])),
      );
  }

  getHero(id: number): Observable<HeroInterface> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<HeroInterface>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<HeroInterface>(`getHero id=${id}`)),
      );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
