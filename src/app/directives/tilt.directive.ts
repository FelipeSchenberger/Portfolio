import { Directive, ElementRef, HostListener, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appTilt]',
  standalone: true
})
export class TiltDirective {
  // Configurable parameters
  @Input() maxTilt = 15; // max degrees of tilt
  @Input() perspective = 1000;
  @Input() scale = 1.02;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Add base transition for smooth reset
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)');
    // Will change for hardware acceleration
    this.renderer.setStyle(this.el.nativeElement, 'will-change', 'transform');
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    // Remove transition during movement for snappy response
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'none');

    const card = this.el.nativeElement;
    const rect = card.getBoundingClientRect();

    // Calculate mouse position relative to the card's center
    // Values range from -0.5 to 0.5
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    // Calculate tilt in degrees based on maxTilt
    const tiltX = -y * this.maxTilt * 2; // Invert Y because CSS rotateX is backwards
    const tiltY = x * this.maxTilt * 2;

    const transformStr = `perspective(${this.perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${this.scale}, ${this.scale}, ${this.scale})`;
    
    this.renderer.setStyle(card, 'transform', transformStr);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    // Restore transition for smooth return to initial state
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)');
    this.renderer.setStyle(this.el.nativeElement, 'transform', `perspective(${this.perspective}px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`);
  }
}
