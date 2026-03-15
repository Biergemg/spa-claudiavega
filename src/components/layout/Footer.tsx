import { MapPin, Instagram, MessageCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-brand-carbon text-brand-crema py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        
        {/* Brand & Location */}
        <div className="flex flex-col gap-6">
          <h2 className="font-serif text-3xl">Spa Claudia Vega</h2>
          <div className="font-sans text-brand-crema/60 space-y-2">
            <p>Av. Tamaulipas, Unidad Nacional</p>
            <p>Cd. Madero, Tamaulipas, México</p>
            <p className="mt-4">Tel: 833 272 1133</p>
          </div>
        </div>

        {/* Links & Socials */}
        <div className="flex flex-col gap-8 md:items-end">
          <div className="flex gap-6">
            <a 
              href="https://maps.google.com/?q=Av.+Tamaulipas,+Unidad+Nacional,+Cd.+Madero+" 
              target="_blank" 
              rel="noreferrer"
              className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors group"
            >
              <MapPin size={24} className="text-brand-crema/70 group-hover:text-white transition-colors" />
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noreferrer"
              className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors group"
            >
              <Instagram size={24} className="text-brand-crema/70 group-hover:text-white transition-colors" />
            </a>
            <a 
              href="https://wa.me/528332721133" 
              target="_blank" 
              rel="noreferrer"
              className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors group"
            >
              <MessageCircle size={24} className="text-brand-crema/70 group-hover:text-white transition-colors" />
            </a>
          </div>

          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="font-sans text-sm tracking-widest uppercase text-brand-crema/80">
              Sistema Activo
            </span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-sans text-brand-crema/40">
        <p>&copy; {new Date().getFullYear()} Spa Claudia Vega. Todos los derechos reservados.</p>
        <p>Diseñado para inspirar bienestar.</p>
      </div>
    </footer>
  );
};
