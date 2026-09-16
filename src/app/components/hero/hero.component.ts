import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { ResumeModalComponent } from '../resume-modal/resume-modal.component';
import { Hero3dComponent } from '../hero-3d/hero-3d.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ResumeModalComponent, Hero3dComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  public languageService = inject(LanguageService);
  
  isResumeModalOpen = signal(false);

  openResumeModal() {
    this.isResumeModalOpen.set(true);
  }

  closeResumeModal() {
    this.isResumeModalOpen.set(false);
  }
}
