import { Injectable } from '@angular/core';
import { HeroInterface } from '../interface/hero.interface';
import { HEROES } from '../mock/mock-heroes';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  constructor() {
  }

  getHeroes(): HeroInterface[] {
    return HEROES;
  }
}
