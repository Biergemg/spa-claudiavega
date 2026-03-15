import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Button } from '../ui/Button';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initial entrance animation
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  const links = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Experiencia', href: '#experiencia' },
    { name: 'Ubicación', href: '#ubicacion' },
  ];

  return (
    <header 
      ref={navRef}
      className={`fixed top-4 left-0 right-0 z-50 transition-all duration-500 flex justify-center px-4`}
    >
      <nav 
        className={`
          flex items-center justify-between px-6 py-3 rounded-full w-full max-w-5xl
          transition-all duration-500 ease-out border
          ${isScrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-lg border-white/20 text-brand-carbon' 
            : 'bg-transparent border-transparent text-white'}
        `}
      >
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2">
          <img src="/logo.png" alt="Spa Claudia Vega" className="h-10 w-auto object-contain drop-shadow-sm" />
          <span className="font-serif text-xl tracking-wide font-medium hidden sm:inline-block">Spa Claudia Vega</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="font-sans text-sm tracking-widest uppercase hover:opacity-70 transition-opacity"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Button 
            variant={isScrolled ? 'primary' : 'outline'} 
            size="sm" 
            className={!isScrolled ? 'border-white text-white hover:bg-white hover:text-brand-carbon' : ''}
            aria-label="Reservar cita"
            onClick={() => window.open('https://wa.me/528332721133?text=Hola%20quiero%20información%20sobre%20los%20tratamientos', '_blank')}
          >
            Reservar cita
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu (simplified for now) */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 bg-white rounded-2xl p-6 shadow-xl flex flex-col gap-4 md:hidden border border-brand-crema">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="font-sans text-lg text-brand-carbon py-2 border-b border-brand-crema/50 last:border-0"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Button 
            variant="primary" 
            className="mt-4 w-full"
            aria-label="Reservar cita"
            onClick={() => window.open('https://wa.me/528332721133?text=Hola%20quiero%20información%20sobre%20los%20tratamientos', '_blank')}
          >
            Reservar cita
          </Button>
        </div>
      )}
    </header>
  );
};
