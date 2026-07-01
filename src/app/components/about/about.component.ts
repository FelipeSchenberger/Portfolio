import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { TiltDirective } from '../../directives/tilt.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TiltDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  public languageService = inject(LanguageService);
}
