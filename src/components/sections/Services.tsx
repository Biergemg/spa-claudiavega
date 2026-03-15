import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Droplets, Wind } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Masaje terapéutico',
    description: 'Alivia tensión muscular, mejora circulación y reduce estrés físico con nuestras técnicas especializadas.',
    icon: Wind,
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Faciales especializados',
    description: 'Tratamientos profesionales para revitalizar tu piel, limpiar impurezas y mejorar su apariencia natural.',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Experiencias de relajación',
    description: 'Rituales diseñados para ayudarte a recuperar tu equilibrio interno, elevar tu energía y encontrar la calma.',
    icon: Droplets,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  }
];

export const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from('.services-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Cards staggered reveal
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          delay: i * 0.15
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="servicios"
      className="py-24 md:py-32 px-6 bg-brand-crema"
    >
      <div className="max-w-7xl mx-auto">
        <div className="services-title text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl text-brand-carbon mb-6">Nuestros Tratamientos</h2>
          <p className="font-sans text-brand-carbon/70 max-w-2xl mx-auto text-lg">
            Descubre nuestra selección de terapias diseñadas para renovar tu cuerpo y calmar tu mente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div 
              key={service.title}
              ref={el => { cardsRef.current[index] = el; }}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-full aspect-[4/5] mb-8 overflow-hidden rounded-[2rem] md:rounded-[3rem]">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-brand-carbon/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              
              <div className="bg-brand-beige/10 p-4 rounded-full mb-6 text-brand-beige group-hover:bg-brand-beige group-hover:text-white transition-colors duration-500">
                <service.icon size={28} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-2xl font-serif text-brand-carbon mb-4">{service.title}</h3>
              <p className="font-sans text-brand-carbon/70 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
