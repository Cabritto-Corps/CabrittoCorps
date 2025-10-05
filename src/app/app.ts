import { Component, OnInit, OnDestroy, PLATFORM_ID, signal, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import AOS from 'aos';

// Seus componentes
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Services } from './components/services/services';
import { Projects } from './components/projects/projects';
import { Team } from './components/team/team';
import { Faq } from './components/faq/faq';
import { Contact } from './components/contact/contact';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    Header,
    Hero,
    About,
    Services,
    Projects,
    Team,
    Faq,
    Contact
  ],
  templateUrl: './app.html',
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('cabritto-landing-page');

  // --- LÓGICA DO ÁUDIO ---
  private audio!: HTMLAudioElement; // Removida a inicialização aqui
  private intervalId: any;
  public isMuted = signal(true);
  // --- FIM DA LÓGICA DO ÁUDIO ---

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Inicializa as animações de scroll
      AOS.init({
        duration: 750,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
      });

      // --- INICIALIZAÇÃO CORRIGIDA DO ÁUDIO ---
      // Inicializa o objeto de áudio apenas uma vez e com o caminho correto
      this.audio = new Audio();
      this.audio.src = 'assets/audio/beeeh.mp4'; // CORREÇÃO: Removido o '/src'
      this.audio.muted = this.isMuted();
      this.iniciarLoopDeAudio();
    }
  }

  // --- MÉTODOS DO ÁUDIO (sem alterações) ---
  iniciarLoopDeAudio(): void {
    console.log('Iniciando loop de áudio (começa mudo).');
    this.tocarAudio();
    this.intervalId = setInterval(() => this.tocarAudio(), 10000);
  }

  private tocarAudio(): void {
    this.audio.currentTime = 0;
    this.audio.play().catch(error => {
      console.warn('Tentativa de autoplay bloqueada (comportamento esperado):', error.name);
    });
  }

  toggleSom(): void {
    this.isMuted.set(!this.isMuted());
    this.audio.muted = this.isMuted();

    if (!this.isMuted()) {
      console.log('Som ativado pelo usuário.');
      this.audio.play().catch(error => console.error("Erro ao tocar áudio após toggle:", error));
    } else {
      console.log('Som desativado pelo usuário.');
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
