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
      gsap.from('.location-content > *', {
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
        
        <div className="location-content md:w-1/2 flex flex-col items-start bg-white p-10 md:p-14 rounded-[2rem] md:rounded-[3rem]">
          <div className="bg-brand-rosa/20 p-4 rounded-full mb-8 text-brand-rosa">
            <MapPin size={32} />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-serif text-brand-carbon mb-6 tracking-tight">
            Nuestra Ubicación
          </h2>
          
          <div className="space-y-4 font-sans text-brand-carbon/70 text-lg md:text-xl leading-relaxed mb-10">
            <p>
              Ubicados en Av. Tamaulipas, Unidad Nacional
              <br />
              Cd. Madero, Tamaulipas.
            </p>
            <p className="text-base text-brand-carbon/60">
              Dentro del complejo comercial con estacionamiento disponible para su mayor comodidad.
            </p>
          </div>
          
          <Button 
            variant="outline" 
            size="md"
            onClick={() => window.open('https://maps.google.com/?q=Av.+Tamaulipas,+Unidad+Nacional,+Cd.+Madero+', '_blank')}
          >
            Abrir en Google Maps
          </Button>
        </div>

        <div className="location-map md:w-1/2 w-full h-[400px] md:h-[600px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d14545.926211287933!2d-97.8540417!3d22.2536855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d7fbd8723f5b87%3A0xe9efef5bc6859e94!2sUnidad%20Nacional%2C%20Cd%20Madero%2C%20Tamps.!5e0!3m2!1sen!2smx!4v1700000000000!5m2!1sen!2smx" 
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
