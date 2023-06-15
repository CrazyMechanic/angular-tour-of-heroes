import { Injectable } from '@angular/core';
import { HeroInterface } from '../interface/hero.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };

  // private heroesUrl = 'https://tour-of-heroes-be1d4-default-rtdb.europe-west1.firebasedatabase.app/heroes';  // URL to web api
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  getHeroes(): Observable<HeroInterface[]> {
    return this.http.get<HeroInterface[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<HeroInterface[]>('getHeroes', [])),
      );
  }

  getHeroNo404<Data>(id: number): Observable<HeroInterface> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<HeroInterface[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<HeroInterface>(`getHero id=${id}`)),
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

  updateHero(hero: HeroInterface): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero')),
      );

  }

  addHero(hero: HeroInterface): Observable<HeroInterface> {
    return this.http.post<HeroInterface>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: HeroInterface) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<HeroInterface>('addHero')),
      );
  }

  deleteHero(id: number): Observable<HeroInterface> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<HeroInterface>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<HeroInterface>('deleteHero')),
      );
  }

  searchHeroes(term: string): Observable<HeroInterface[]> {
    if (!term.trim()) return of([]);

    return this.http.get<HeroInterface[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<HeroInterface[]>('searchHeroes', [])),
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
