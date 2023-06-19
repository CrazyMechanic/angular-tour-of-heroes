import { Component, OnInit } from '@angular/core';
import { HeroInterface } from '../../interface/hero.interface';
import { HeroService } from '../../services/hero.service';
import { InMemoryDataService } from '../../services/in-memory-data.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes: HeroInterface[] = [];

  constructor(private heroService: HeroService, private inMemoryDataService: InMemoryDataService) {
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string) {
    name = name.trim();
    if (!name) return;
    console.log(name);
    const id = this.inMemoryDataService.genId(this.heroes);

    const newHero: HeroInterface = {
      name: name,
      id: id,
    };
    console.log(newHero);

    this.heroService.addHero(newHero).subscribe(hero => {
      hero = {
        key: hero.name,
        id: newHero.id,
        name: newHero.name,
      };
      this.heroes.push(hero);
      console.log(hero);
    });

    // this.heroService.addHero({name} as HeroInterface).subscribe(hero => {
    //   this.heroes.push(hero);
    // });
  }

  delete(hero: HeroInterface) {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
