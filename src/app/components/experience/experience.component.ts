import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { TiltDirective } from '../../directives/tilt.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TiltDirective],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  public languageService = inject(LanguageService);

  experiences = computed(() => this.languageService.t().experience.jobs);
}
