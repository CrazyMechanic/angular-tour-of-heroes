import { Component } from '@angular/core';
import { HeroInterface } from '../interface/hero.interface';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent {
  hero: HeroInterface = {
    id: 1,
    name: 'Windstorm',
  };
}
