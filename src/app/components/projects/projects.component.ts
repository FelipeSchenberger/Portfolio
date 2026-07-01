import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { TiltDirective } from '../../directives/tilt.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TiltDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  public languageService = inject(LanguageService);

  projects = computed(() => this.languageService.t().projects.list);
}
