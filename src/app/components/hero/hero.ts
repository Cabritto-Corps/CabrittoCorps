import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, NgZone } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId!: number;
  private particles: Particle[] = [];
  private resizeObserver!: ResizeObserver;

  constructor(private ngZone: NgZone) { }

  ngAfterViewInit(): void {
    this.initCanvas();
    this.resizeObserver = new ResizeObserver(() => this.resizeCanvas());
    this.resizeObserver.observe(this.canvasRef.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    this.createParticles();

    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.createParticles(); // Recreate particles on resize for better distribution
  }

  private createParticles(): void {
    const canvas = this.canvasRef.nativeElement;
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000); // Density
    this.particles = [];

    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(canvas.width, canvas.height));
    }
  }

  private animate(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    this.particles.forEach(particle => {
      particle.update(canvas.width, canvas.height);
      particle.draw(this.ctx);
    });

    // Draw connections
    this.drawConnections();

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  private drawConnections(): void {
    const maxDistance = 150;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`; // Subtle white lines
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5; // Slow movement
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2 + 1;
  }

  update(width: number, height: number): void {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off edges
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, 0.3)`; // Subtle white dots
    ctx.fill();
  }
}
