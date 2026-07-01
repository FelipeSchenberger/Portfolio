import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  templateUrl: './custom-cursor.component.html',
  styleUrl: './custom-cursor.component.css'
})
export class CustomCursorComponent {
  mouseX = signal(0);
  mouseY = signal(0);
  trailingX = signal(0);
  trailingY = signal(0);
  
  isHovering = signal(false);
  isVisible = signal(false);

  private animationFrameId: number | null = null;

  constructor() {
    this.animate();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isVisible()) {
      this.isVisible.set(true);
    }
    
    // Update main cursor dot instantly
    this.mouseX.set(event.clientX);
    this.mouseY.set(event.clientY);

    // Check if hovering over clickable elements
    const target = event.target as HTMLElement;
    const isClickable = target.closest('a') || 
                        target.closest('button') || 
                        target.closest('.glass-card') ||
                        target.closest('.lang-toggle');
                        
    this.isHovering.set(!!isClickable);
  }

  @HostListener('window:mouseleave')
  onMouseLeave() {
    this.isVisible.set(false);
  }

  // Smooth trailing animation using requestAnimationFrame
  animate = () => {
    // Easing factor (lower is slower/smoother)
    const ease = 0.15;
    
    // Calculate distance
    const dx = this.mouseX() - this.trailingX();
    const dy = this.mouseY() - this.trailingY();
    
    // Apply easing
    this.trailingX.set(this.trailingX() + dx * ease);
    this.trailingY.set(this.trailingY() + dy * ease);
    
    this.animationFrameId = requestAnimationFrame(this.animate);
  }
}
