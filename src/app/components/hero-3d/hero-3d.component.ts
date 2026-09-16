import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-hero-3d',
  standalone: true,
  template: `<div #canvasContainer class="canvas-container"></div>`,
  styles: [`
    .canvas-container {
      width: 100%;
      height: 100%;
      min-height: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
    .canvas-container canvas {
      max-width: 100%;
      max-height: 100%;
      outline: none;
    }
  `]
})
export class Hero3dComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer') private canvasContainer!: ElementRef<HTMLDivElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private sphere!: THREE.Mesh;
  private animationId: number | null = null;
  private isBrowser: boolean;

  private mouseX = 0;
  private mouseY = 0;
  private targetRotationX = 0;
  private targetRotationY = 0;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      if ('fonts' in document) {
        // Wait for Bebas Neue to load into memory so the canvas doesn't fall back to Arial
        Promise.race([
          document.fonts.load('50px "Bebas Neue"'),
          new Promise(resolve => setTimeout(resolve, 800))
        ]).then(() => {
          this.initThreeJs();
          this.addEventListeners();
        });

        // Extra fallback: update texture if fonts finish anytime after
        document.fonts.ready.then(() => {
          this.updateTexture();
        });
      } else {
        this.initThreeJs();
        this.addEventListeners();
      }
    }
  }

  private updateTexture(): void {
    if (!this.sphere || !this.renderer) return;
    const newTexture = this.createTechTexture();
    const material = this.sphere.material as THREE.MeshBasicMaterial;
    if (material) {
      if (material.map) {
        material.map.dispose();
      }
      material.map = newTexture;
      material.needsUpdate = true;
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      this.removeEventListeners();
      if (this.animationId !== null) {
        cancelAnimationFrame(this.animationId);
      }
      if (this.renderer) {
        this.renderer.dispose();
      }
    }
  }

  private initThreeJs(): void {
    const container = this.canvasContainer.nativeElement;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene setup
    this.scene = new THREE.Scene();

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.z = 6.5;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(this.renderer.domElement);

    // Create high-res Canvas Texture with transparent background
    const texture = this.createTechTexture();

    // 1. Outer Sphere (Text)
    const geometry = new THREE.SphereGeometry(2.5, 64, 64);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 1.0,
      side: THREE.DoubleSide,
      depthWrite: false
    });

    this.sphere = new THREE.Mesh(geometry, material);
    this.scene.add(this.sphere);

    // 2. Inner Wireframe (Geometric Cyber feel)
    const innerGeometry = new THREE.IcosahedronGeometry(2.2, 2);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0xdc2626, // Intense red
      wireframe: true,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    });
    
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    this.sphere.add(innerMesh);

    // Start Animation Loop outside Angular zone
    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });
  }

  private createTechTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 2048; // High resolution
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const techStack = [
      'ANGULAR', 'NESTJS', 'REACT', 'POSTGRESQL', 
      'PYTHON', 'FASTAPI', 'NODE.JS', 'TYPESCRIPT'
    ];

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw tech stack repeating
    const cols = 5;
    const rows = 10;
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // Offset alternate rows for a brick-like pattern
        const xOffset = (i % 2 === 0) ? 0 : (canvas.width / cols) / 2;
        const x = (canvas.width / cols) * j + (canvas.width / cols) / 2 + xOffset;
        const y = (canvas.height / rows) * i + (canvas.height / rows) / 2;
        
        // Solid opaque colors without transparency or washing out
        const colorIndex = (i + j) % 3;
        if (colorIndex === 0) {
          ctx.fillStyle = '#ef4444'; // Solid intense red
          ctx.font = 'bold 50px "Bebas Neue", Arial, sans-serif';
        } else if (colorIndex === 1) {
          ctx.fillStyle = '#b91c1c'; // Solid dark red
          ctx.font = 'bold 46px "Bebas Neue", Arial, sans-serif';
        } else {
          ctx.fillStyle = '#ffffff'; // Solid pure white
          ctx.font = 'bold 48px "Bebas Neue", Arial, sans-serif';
        }

        const techIndex = (i * cols + j) % techStack.length;
        
        // Sharp rendering without blurry glow haze
        ctx.shadowBlur = 0;
        
        ctx.fillText(techStack[techIndex], x, y);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
    return texture;
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);

    // Base rotation
    this.sphere.rotation.y += 0.002;
    this.sphere.rotation.x += 0.001;

    // Mouse interaction rotation (ease towards target)
    this.targetRotationY = this.mouseX * 0.8;
    this.targetRotationX = this.mouseY * 0.5;

    this.sphere.rotation.y += 0.05 * (this.targetRotationY - this.sphere.rotation.y);
    this.sphere.rotation.x += 0.05 * (this.targetRotationX - this.sphere.rotation.x);

    this.renderer.render(this.scene, this.camera);
  }

  private onDocumentMouseMove = (event: MouseEvent) => {
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    this.mouseX = (event.clientX - windowHalfX) / windowHalfX;
    this.mouseY = (event.clientY - windowHalfY) / windowHalfY;
  }
  
  private onWindowResize = () => {
    if (!this.camera || !this.renderer || !this.canvasContainer) return;
    
    const container = this.canvasContainer.nativeElement;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private addEventListeners(): void {
    document.addEventListener('mousemove', this.onDocumentMouseMove, false);
    window.addEventListener('resize', this.onWindowResize, false);
  }

  private removeEventListeners(): void {
    document.removeEventListener('mousemove', this.onDocumentMouseMove, false);
    window.removeEventListener('resize', this.onWindowResize, false);
  }
}
