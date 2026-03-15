import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../ui/Button';
import { MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Location = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-up de la tarjeta izquierda y contenido
      gsap.from('.location-card > *', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // Fade-up del texto SEO local
      gsap.from('.seo-text', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
      });
      
      // Iframe de Google Maps
      gsap.from('.location-map', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="ubicacion"
      className="py-24 md:py-32 px-6 bg-brand-crema"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
        
        {/* Lado izquierdo con Contenido principal + Texto SEO */}
        <div className="w-full md:w-1/2 flex flex-col gap-8">
          <div className="location-card flex flex-col items-start bg-white p-10 md:p-14 rounded-[2rem] md:rounded-[3rem] shadow-sm">
            <div className="bg-brand-rosa/20 p-4 rounded-full mb-8 text-brand-rosa">
              <MapPin size={32} />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-serif text-brand-carbon mb-6 tracking-tight">
              Nuestra Ubicación
            </h2>
            
            <div className="space-y-4 font-sans text-brand-carbon/70 text-lg md:text-xl leading-relaxed mb-10">
              <p>
                Nos encontramos en Av. Tamaulipas S/N,<br />
                Unidad Nacional, Ciudad Madero.
              </p>
              <p className="text-base text-brand-carbon/60">
                Contamos con acceso dentro del complejo comercial y estacionamiento cercano.
              </p>
            </div>
            
            <Button 
              variant="outline" 
              size="md"
              aria-label="Abrir mapa de ubicación en Google Maps"
              className="hover:scale-105 transition-transform duration-300"
              onClick={() => window.open('https://maps.google.com/?q=Av+Tamaulipas+SN+Unidad+Nacional+89410+Ciudad+Madero+Tamaulipas', '_blank')}
            >
              Abrir en Google Maps
            </Button>
          </div>

          {/* Mejora SEO Local */}
          <div className="seo-text px-4 md:px-8 text-brand-carbon/60 font-sans text-sm leading-relaxed">
            <p className="font-semibold text-brand-carbon mb-1">Spa Claudia Vega</p>
            <p>Av. Tamaulipas S/N</p>
            <p>Unidad Nacional</p>
            <p>89410 Ciudad Madero, Tamaulipas</p>
          </div>
        </div>

        {/* Lado derecho con El Mapa Embebido */}
        <div className="location-map md:w-1/2 w-full h-[400px] md:h-[600px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative">
          <iframe 
             src="https://www.google.com/maps?q=Av%20Tamaulipas%20SN%20Unidad%20Nacional%20Ciudad%20Madero%20Tamaulipas&output=embed"
            className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-1000" 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa de ubicación Spa Claudia Vega"
          />
        </div>

      </div>
    </section>
  );
};
