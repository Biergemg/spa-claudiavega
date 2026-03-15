import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isMagnetic?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isMagnetic = true,
      children,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      const button = buttonRef.current;
      const content = contentRef.current;
      if (!button || !content || !isMagnetic) return;

      const handleMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = button.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        gsap.to(button, {
          x: mouseX * 0.2,
          y: mouseY * 0.2,
          duration: 1,
          ease: 'power3.out',
        });
        
        gsap.to(content, {
          x: mouseX * 0.1,
          y: mouseY * 0.1,
          duration: 1,
          ease: 'power3.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to([button, content], {
          x: 0,
          y: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.3)',
        });
      };

      button.addEventListener('mousemove', handleMouseMove);
      button.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        button.removeEventListener('mousemove', handleMouseMove);
        button.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, [isMagnetic]);

    // Merge forwarded ref and internal ref
    const combinedRef = (node: HTMLButtonElement) => {
      buttonRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const baseStyles = "relative inline-flex items-center justify-center overflow-hidden font-sans transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none rounded-full";
    
    const variants = {
      primary: "bg-brand-beige text-white hover:bg-[#c9a37c]",
      secondary: "bg-brand-rosa text-brand-carbon hover:bg-[#d9b5b5]",
      outline: "border border-brand-carbon text-brand-carbon hover:bg-brand-carbon hover:text-white",
      ghost: "text-brand-carbon hover:bg-black/5"
    };

    const sizes = {
      sm: "h-10 px-6 text-sm",
      md: "h-12 px-8 text-base",
      lg: "h-14 px-10 text-lg"
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ''}`;

    return (
      <button ref={combinedRef} className={classes} {...props}>
        {/* Hover background effect (optional, can add pseudo element magic here) */}
        <span ref={contentRef} className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';
