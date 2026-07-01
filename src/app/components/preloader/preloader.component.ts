import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.css'
})
export class PreloaderComponent implements OnInit {
  isLoaded = signal(false);
  isRemoved = signal(false);

  ngOnInit() {
    // Start fade out after 1.8s
    setTimeout(() => {
      this.isLoaded.set(true);
      // Remove from DOM completely after fade out completes
      setTimeout(() => {
        this.isRemoved.set(true);
      }, 500); // 500ms fade transition duration
    }, 1800);
  }
}
