import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-resume-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume-modal.component.html',
  styleUrl: './resume-modal.component.css'
})
export class ResumeModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  public languageService = inject(LanguageService);

  onClose() {
    this.close.emit();
  }

  // Prevent closing when clicking inside the modal content
  onContentClick(event: Event) {
    event.stopPropagation();
  }
}
