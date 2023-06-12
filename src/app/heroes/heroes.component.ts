import { Component } from '@angular/core';
import { HEROES } from '../mock/mock-heroes';
import { HeroInterface } from '../interface/hero.interface';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent {
  selectedHero?: HeroInterface;
  heroes = HEROES;

  onSelect(hero: HeroInterface): void {
    this.selectedHero = hero;
  }
}
