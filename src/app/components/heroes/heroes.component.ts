import { Component, OnInit } from '@angular/core';
import { HeroInterface } from '../../interface/hero.interface';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  selectedHero?: HeroInterface;
  heroes: HeroInterface[] = [];

  constructor(private heroService: HeroService) {
  }

  onSelect(hero: HeroInterface): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}
