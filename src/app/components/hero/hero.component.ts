import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { ResumeModalComponent } from '../resume-modal/resume-modal.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ResumeModalComponent],
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
