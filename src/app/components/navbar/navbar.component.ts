import { Component, HostListener, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public languageService = inject(LanguageService);
  isScrolled = false;
  isMobileMenuOpen = false;

  navLinks = computed(() => {
    const t = this.languageService.t().navbar;
    return [
      { label: t.inicio, href: '#hero' },
      { label: t.sobreMi, href: '#about' },
      { label: t.experiencia, href: '#experience' },
      { label: t.proyectos, href: '#projects' },
      { label: t.skills, href: '#skills' },
      { label: t.educacion, href: '#education' },
      { label: t.contacto, href: '#footer' }
    ];
  });

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  scrollTo(event: Event, href: string): void {
    event.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      this.closeMobileMenu();
    }
  }
}
