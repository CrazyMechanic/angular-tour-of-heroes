import { Injectable } from '@angular/core';
import { HeroInterface } from '../interface/hero.interface';
import { HEROES } from '../mock/mock-heroes';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  constructor() {
  }

  getHeroes(): Observable<HeroInterface[]> {
    const heroes = of(HEROES);
    return heroes;
  }
}
