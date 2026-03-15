import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

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
    text: "Instalaciones muy cómodas y personal muy profesional.",
    author: "Visita de primera vez"
  }
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLQuoteElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const changeTestimonial = (index: number) => {
    if (index === currentIndex) return;
    
    gsap.to(textRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.4,
      onComplete: () => {
        setCurrentIndex(index);
        gsap.to(textRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      }
    });

    if (timerRef.current) {
      clearInterval(timerRef.current);
      startAutoPlay();
    }
  };

  const startAutoPlay = () => {
    timerRef.current = window.setInterval(() => {
      setCurrentIndex(prev => {
        const next = (prev + 1) % testimonials.length;
        changeTestimonial(next);
        return prev; // Value is updated inside changeTestimonial's callback implicitly, actually we just need the calculation
      });
    }, 6000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-24 md:py-32 px-6 bg-white relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-crema/40 z-0">
        <Quote size={240} className="transform -scale-x-100" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
        <blockquote ref={textRef} className="min-h-[200px] flex flex-col justify-center items-center">
          <p className="text-2xl md:text-4xl lg:text-5xl font-serif text-brand-carbon leading-[1.4] mb-8">
            "{testimonials[currentIndex].text}"
          </p>
          <footer className="text-brand-carbon/60 font-sans tracking-widest uppercase text-sm">
            — {testimonials[currentIndex].author}
          </footer>
        </blockquote>

        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => changeTestimonial(idx)}
              className={`h-2 rounded-full transition-all duration-500 ease-out 
                ${currentIndex === idx ? 'w-12 bg-brand-beige' : 'w-2 bg-brand-beige/30 hover:bg-brand-beige/50'}`}
              aria-label={`Ver testimonio ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
