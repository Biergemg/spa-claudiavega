import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from '../ui/Button';
import { ChevronDown } from 'lucide-react';

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Slight scale-down parallax effect on background
      gsap.from('.hero-bg', {
        scale: 1.05,
        duration: 2.5,
        ease: 'power2.out',
      });

      // Staggered text reveal
      tl.fromTo(
        headlineRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.5 }
      )
        .fromTo(
          subheadRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          '-=0.8'
        )
        .fromTo(
          buttonsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          '.scroll-indicator',
          { opacity: 0, y: -10 },
          { opacity: 0.8, y: 0, duration: 1, repeat: -1, yoyo: true, ease: 'power1.inOut' },
          '-=0.2'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef} 
      id="inicio"
      className="relative w-full h-screen min-h-[600px] flex items-end overflow-hidden"
    >
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="hero-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')` 
          }}
        />
        {/* Dark gradient for contrast, stronger at bottom left */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-carbon/90 via-brand-carbon/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-carbon/70 via-transparent to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 md:pb-32 lg:pb-40 flex flex-col items-start justify-end h-full">
        <div className="max-w-3xl">
          <h1 
            ref={headlineRef}
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-[1.1]"
          >
            Relájate. Respira. Renueva tu piel.
          </h1>
          
          <p 
            ref={subheadRef}
            className="text-lg md:text-xl text-brand-crema/90 font-sans font-light max-w-xl mb-10 leading-relaxed"
          >
            Spa Claudia Vega es un espacio dedicado al bienestar, donde combinamos tratamientos profesionales con un ambiente diseñado para relajar cuerpo y mente.
          </p>
          
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="primary" 
              size="lg"
              aria-label="Reservar cita por WhatsApp"
              onClick={() => window.open('https://wa.me/528332721133?text=Hola%20quiero%20información%20sobre%20los%20tratamientos', '_blank')}
            >
              Reservar cita por WhatsApp
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-brand-carbon"
              aria-label="Ver tratamientos"
              onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver tratamientos
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/70">
        <span className="font-sans text-xs uppercase tracking-widest">Descubrir</span>
        <ChevronDown size={20} className="animate-bounce" />
      </div>
    </section>
  );
};
