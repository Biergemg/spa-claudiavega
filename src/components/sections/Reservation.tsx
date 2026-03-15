import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

export const Reservation = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
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
      className="py-24 md:py-32 px-6 bg-brand-beige"
    >
      <div 
        ref={contentRef} 
        className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center p-8 md:p-16 bg-white/10 rounded-[3rem] md:rounded-[4rem] backdrop-blur-sm border border-white/20 shadow-2xl"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">
          Regálate un momento para ti.
        </h2>
        
        <p className="text-lg md:text-xl font-sans text-white/90 max-w-2xl mb-12 leading-relaxed">
          Agenda tu tratamiento y disfruta una experiencia de relajación profunda en Spa Claudia Vega.
        </p>

        <Button 
          variant="primary" 
          size="lg" 
          className="bg-brand-beige text-white hover:bg-brand-carbon px-12 py-8 text-lg md:text-xl rounded-full shadow-xl hover:scale-105 transition-transform duration-300 flex items-center gap-3 mx-auto"
          aria-label="Reservar cita por WhatsApp"
          onClick={() => window.open('https://wa.me/528332721133?text=Hola%20quiero%20información%20sobre%20los%20tratamientos', '_blank')}
        >
          Reservar cita por WhatsApp
        </Button>
      </div>
    </section>
  );
};
