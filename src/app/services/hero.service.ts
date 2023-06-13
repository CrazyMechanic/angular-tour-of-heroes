import { Injectable } from '@angular/core';
import { HeroInterface } from '../interface/hero.interface';
import { HEROES } from '../mock/mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  constructor(private messageService: MessageService) {
  }

  getHeroes(): Observable<HeroInterface[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }
}
