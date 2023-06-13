import { Component, Input } from '@angular/core';
import { HeroInterface } from '../../interface/hero.interface';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent {
  @Input() hero?: HeroInterface | undefined;
}
