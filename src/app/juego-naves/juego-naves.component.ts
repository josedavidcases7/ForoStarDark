import { AfterViewInit, Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
interface Particula {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  vida: number;
}

@Component({
  selector: 'app-juego-naves',
  standalone: true,
imports: [CommonModule, HeaderComponent],
  templateUrl: './juego-naves.component.html',
  styleUrls: ['./juego-naves.component.scss'],
})
export class JuegoNavesComponent implements AfterViewInit {
  @ViewChild('gameCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
constructor(private cdRef: ChangeDetectorRef) {}

  private ctx!: CanvasRenderingContext2D;
  private nave = { x: 200, y: 350, width: 80, height: 60 };
  private balas: any[] = [];
  private enemigos: any[] = [];
  private pausado = false;

  mostrarModal = false;

  private canvasWidth = 800;
  private canvasHeight = 440;

  private nivel = 1;
  private velocidadEnemigos = 2;
  private intervaloEnemigos: any;
  private tiempoNivel: any;
  private maxVelocidad = 6;
  private minFrecuencia = 400;

  private naveImg!: HTMLImageElement;
  private naveCargada = false;

  private enemigoImgs: HTMLImageElement[] = [];
  private enemigosCargados = false;

  private puntuacion = 0;
  private ultimaPuntuacionChequeada = 0;

  private teclasPresionadas: { [key: string]: boolean } = {};
  private ultimaBala = 0;
  private tiempoEntreBalas = 300;

  private particulas: Particula[] = [];
  private siguienteObjetivo = 50;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    this.naveImg = new Image();
    this.naveImg.src = 'assets/images/nave.png';
    this.naveImg.onload = () => {
      this.naveCargada = true;
    };

    const img1 = new Image();
    img1.src = 'assets/images/enemigo1.gif';
    const img2 = new Image();
    img2.src = 'assets/images/enemigo2.gif';

    let cargados = 0;
    [img1, img2].forEach(img => {
      img.onload = () => {
        cargados++;
        if (cargados === 2) this.enemigosCargados = true;
      };
    });

    this.enemigoImgs = [img1, img2];

    document.addEventListener('keydown', (e) => this.teclasPresionadas[e.key.toLowerCase()] = true);
    document.addEventListener('keyup', (e) => this.teclasPresionadas[e.key.toLowerCase()] = false);

    this.iniciarIntervalos();
    this.bucle();
  }

  moverNave() {
    const velocidad = 5;

    if ((this.teclasPresionadas['arrowleft'] || this.teclasPresionadas['a']) && this.nave.x > 0) {
      this.nave.x -= velocidad;
    }
    if ((this.teclasPresionadas['arrowright'] || this.teclasPresionadas['d']) && this.nave.x + this.nave.width < this.canvasWidth) {
      this.nave.x += velocidad;
    }
    if ((this.teclasPresionadas['arrowup'] || this.teclasPresionadas['w']) && this.nave.y > 0) {
      this.nave.y -= velocidad;
    }
    if ((this.teclasPresionadas['arrowdown'] || this.teclasPresionadas['s']) && this.nave.y + this.nave.height < this.canvasHeight) {
      this.nave.y += velocidad;
    }

    if ((this.teclasPresionadas[' '] || this.teclasPresionadas['space']) && !this.pausado) {
      this.disparar();
    }
  }

  disparar() {
    const ahora = Date.now();
    if (ahora - this.ultimaBala >= this.tiempoEntreBalas) {
      this.balas.push({
        x: this.nave.x + this.nave.width / 2 - 2,
        y: this.nave.y
      });
      this.ultimaBala = ahora;
    }
  }

  crearEnemigo() {
    if (!this.pausado && this.enemigosCargados) {
      const x = Math.random() * (this.canvasWidth - 40);
      const tipo = Math.floor(Math.random() * this.enemigoImgs.length);
      this.enemigos.push({ x, y: 0, width: 40, height: 40, tipo });
    }
  }

  iniciarIntervalos() {
    this.intervaloEnemigos = setInterval(() => this.crearEnemigo(), 1000);

    this.tiempoNivel = setInterval(() => {
      this.nivel++;
      this.velocidadEnemigos = Math.min(this.maxVelocidad, this.velocidadEnemigos + 0.5);

      if (this.nivel % 3 === 0 && this.nave.width < 80) {
        this.nave.width += 5;
      }

      clearInterval(this.intervaloEnemigos);
      const nuevaFrecuencia = Math.max(this.minFrecuencia, 1000 - this.nivel * 80);
      this.intervaloEnemigos = setInterval(() => this.crearEnemigo(), nuevaFrecuencia);

      console.log(`Nivel ${this.nivel} | Velocidad enemigos: ${this.velocidadEnemigos} | Frecuencia: ${nuevaFrecuencia}ms | Ancho nave: ${this.nave.width}`);
    }, 10000);
  }

  bucle() {
    requestAnimationFrame(() => this.bucle());

    if (this.pausado) return;

    this.moverNave();
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.dibujarNave();
    this.dibujarBalas();
    this.dibujarEnemigos();
    this.dibujarPuntuacion();
    this.actualizarYdibujarParticulas();
  }

  dibujarNave() {
    if (this.naveCargada) {
      this.ctx.drawImage(this.naveImg, this.nave.x, this.nave.y, this.nave.width, this.nave.height);
    } else {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.nave.x, this.nave.y, this.nave.width, this.nave.height);
    }
  }

  dibujarBalas() {
    this.ctx.fillStyle = 'red';
    this.balas = this.balas.filter(b => b.y > 0);
    this.balas.forEach(b => {
      b.y -= 5;
      this.ctx.fillRect(b.x, b.y, 4, 10);
    });
  }

  dibujarEnemigos() {
    this.enemigos = this.enemigos.filter(e => e.y < this.canvasHeight);
    for (const e of this.enemigos) {
      e.y += this.velocidadEnemigos;

      const img = this.enemigoImgs[e.tipo];
      if (img) {
        this.ctx.drawImage(img, e.x, e.y, e.width, e.height);
      }

      if (
        e.y + e.height > this.nave.y &&
        e.x < this.nave.x + this.nave.width &&
        e.x + e.width > this.nave.x
      ) {
        this.pausarJuego();
        this.mostrarModal = true;
          this.cdRef.detectChanges();

        break;
      }

      this.balas.forEach((bala, i) => {
        if (bala.x > e.x && bala.x < e.x + e.width && bala.y < e.y + e.height) {
          if (e.tipo === 0) this.puntuacion += 10;
          else if (e.tipo === 1) this.puntuacion += 5;

          this.enemigos = this.enemigos.filter(en => en !== e);
          this.balas.splice(i, 1);
        }
      });
    }
  }

  dibujarPuntuacion() {
    const gradiente = this.ctx.createLinearGradient(0, 0, 200, 0);
    gradiente.addColorStop(0, '#00f0ff');
    gradiente.addColorStop(1, '#8e2de2');

    this.ctx.save();
    this.ctx.font = 'bold 24px "Orbitron", sans-serif';
    this.ctx.fillStyle = gradiente;
    this.ctx.shadowColor = '#00ffff';
    this.ctx.shadowBlur = 10;
    this.ctx.fillText(`★ Puntos: ${this.puntuacion} ★`, 10, 35);
    this.ctx.restore();

    if (this.puntuacion >= this.siguienteObjetivo) {
      this.crearParticulas(100);
      this.siguienteObjetivo += 50;
    }
  }

  crearParticulas(cantidad: number) {
    for (let i = 0; i < cantidad; i++) {
      const p: Particula = {
        x: Math.random() * this.canvasWidth,
        y: Math.random() * this.canvasHeight,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: Math.random() * 3 + 1,
        alpha: 1,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        vida: 60 + Math.random() * 30,
      };
      this.particulas.push(p);
    }
  }

  actualizarYdibujarParticulas() {
    for (let i = this.particulas.length - 1; i >= 0; i--) {
      const p = this.particulas[i];

      p.x += p.vx;
      p.y += p.vy;
      p.vida--;
      p.alpha = p.vida / 90;

      if (p.vida <= 0 || p.alpha <= 0) {
        this.particulas.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  pausarJuego() {
    this.pausado = true;
    clearInterval(this.intervaloEnemigos);
    clearInterval(this.tiempoNivel);
  }

  reiniciarJuego() {
    this.balas = [];
    this.enemigos = [];
    this.teclasPresionadas = {};

    this.nave.width = 80;
    this.nave.height = 60;
    this.nave.x = (this.canvasWidth - this.nave.width) / 2;
    this.nave.y = 350;

    this.pausado = false;
    this.nivel = 1;
    this.velocidadEnemigos = 2;
    this.puntuacion = 0;
    this.ultimaBala = 0;
    this.ultimaPuntuacionChequeada = 0;
    this.particulas = [];
    this.siguienteObjetivo = 50;

    this.iniciarIntervalos();
  }

  onConfirmarReinicio() {
    this.mostrarModal = false;
    this.reiniciarJuego();
  }

  onCancelar(): void {
    this.mostrarModal = false;
      
  }

  
  
}