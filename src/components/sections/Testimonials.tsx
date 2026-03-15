import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "Excelente atención y resultados en mi facial. El ambiente es muy relajante.",
    author: "Cliente verificado"
  },
  {
    text: "Un lugar perfecto para desconectarte del estrés.",
    author: "Cliente frecuente"
  },
  {
    text: "Instalaciones muy cómodas y personal profesional.",
    author: "Visita de primera vez"
  }
];

export const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Título fade up
      gsap.from('.testim-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Tarjetas escalonadas
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          y: 40,
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
      className="py-24 md:py-32 px-6 bg-brand-crema"
    >
      <div className="max-w-7xl mx-auto">
        <div className="testim-title text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl text-brand-carbon mb-6 tracking-tight font-serif">
            Experiencias Reales
          </h2>
          <p className="font-sans text-brand-carbon/70 max-w-2xl mx-auto text-lg">
            Lo que nuestros clientes dicen sobre su momento de bienestar con nosotros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testim, index) => (
            <div 
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className="bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6 text-brand-beige">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="font-sans text-brand-carbon/80 text-lg leading-relaxed mb-8 italic">
                  "{testim.text}"
                </p>
              </div>
              <p className="font-sans text-sm font-medium tracking-wide text-brand-carbon uppercase opacity-60">
                — {testim.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
