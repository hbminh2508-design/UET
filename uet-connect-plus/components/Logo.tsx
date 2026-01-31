
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
  brandName?: string; // New prop to override "UET"
}

const Logo: React.FC<LogoProps> = ({ size = 'md', variant = 'dark', brandName = 'UET' }) => {
  const baseClasses = "font-bold tracking-tight flex items-center gap-1 cursor-pointer select-none transition-all duration-300 hover:scale-105 active:scale-95 group";
  
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-5xl"
  };

  const textClasses = variant === 'light' ? 'text-white' : 'text-slate-900';
  const isUET = brandName.toUpperCase() === 'UET';

  return (
    <div className={`${baseClasses} ${sizeClasses[size]} ${textClasses}`}>
      <span className="group-hover:text-blue-500 transition-colors">{brandName.toUpperCase()}</span>
      <span className="text-blue-600 group-hover:text-purple-600 transition-colors">Connect</span>
      {isUET && (
        <div className="relative ml-1">
          <span className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent italic pr-1 group-hover:from-purple-500 group-hover:to-pink-500 transition-all">
            Plus
          </span>
          {/* Gemini-style Sparkle */}
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute -top-2 -right-3 w-[0.6em] h-[0.6em] text-blue-400 animate-pulse rotate-12 group-hover:text-yellow-400 transition-colors"
            style={{ filter: 'drop-shadow(0 0 4px rgba(96, 165, 250, 0.6))' }}
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Logo;
