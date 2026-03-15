import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text block reveal
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      });

      // Images stagger reveal
      const images = gridRef.current?.querySelectorAll('.exp-img');
      if (images) {
        gsap.from(images, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
          },
          y: 60,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out'
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="experiencia"
      className="py-24 md:py-32 px-6 bg-white"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Storytelling Text */}
        <div ref={textRef} className="lg:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl md:text-5xl font-serif text-brand-carbon mb-8 leading-tight">
            El bienestar no es un lujo,<br/>
            <span className="text-brand-beige">es una necesidad.</span>
          </h2>
          
          <div className="space-y-6 font-sans text-brand-carbon/80 text-lg leading-relaxed">
            <p>
              En Spa Claudia Vega creemos en el poder curativo del tacto y la importancia de hacer una pausa.
            </p>
            <p>
              Creamos un espacio donde cada detalle, desde el aroma hasta la iluminación, 
              está cuidadosamente diseñado para cuidar tu cuerpo, relajar tu mente y ayudarte a sentirte mejor.
            </p>
            <p>
              Permítenos acompañarte en un viaje sensorial que restaurará tu equilibrio natural.
            </p>
          </div>
        </div>

        {/* Visual Grid */}
        <div ref={gridRef} className="lg:w-1/2 w-full grid grid-cols-2 gap-4 md:gap-6">
          <div className="flex flex-col gap-4 md:gap-6 pt-12">
            <div className="exp-img rounded-[2rem] overflow-hidden aspect-[4/5]">
              <img 
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Detalle de aceites y manos" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="exp-img rounded-[2rem] overflow-hidden aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Ambiente del spa" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="exp-img rounded-[2rem] overflow-hidden aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Tratamiento facial" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="exp-img rounded-[2rem] overflow-hidden aspect-[4/5]">
              <img 
                src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Cabinas de relajación" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};
