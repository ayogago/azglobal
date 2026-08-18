interface LogoProps {
  className?: string;
  variant?: 'default' | 'white' | 'dark';
}

export default function Logo({ className = '', variant = 'default' }: LogoProps) {
  const getColors = () => {
    switch (variant) {
      case 'white':
        return {
          primary: '#FFFFFF',
          secondary: '#FFFFFF',
          text: '#FFFFFF'
        };
      case 'dark':
        return {
          primary: '#0F172A',
          secondary: '#454F5E',
          text: '#0F172A'
        };
      default:
        return {
          primary: '#27A6F5',
          secondary: '#1E8FD9',
          text: '#0F172A'
        };
    }
  };

  const colors = getColors();

  return (
    <div className={`flex items-center ${className}`}>
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-3"
      >
        {/* Outer circle */}
        <circle cx="25" cy="25" r="24" fill={colors.primary} opacity="0.1" />

        {/* Globe/Translation icon */}
        <circle cx="25" cy="25" r="18" stroke={colors.primary} strokeWidth="2.5" fill="none" />

        {/* Vertical line */}
        <line x1="25" y1="7" x2="25" y2="43" stroke={colors.primary} strokeWidth="2" />

        {/* Horizontal curved lines representing latitude */}
        <path
          d="M 7 25 Q 25 20, 43 25"
          stroke={colors.secondary}
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 7 25 Q 25 30, 43 25"
          stroke={colors.secondary}
          strokeWidth="1.5"
          fill="none"
        />

        {/* Letter A in the center */}
        <text
          x="25"
          y="32"
          fontSize="20"
          fontWeight="bold"
          fill={colors.primary}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          A
        </text>
      </svg>

      <div className="flex flex-col">
        <div className="flex items-baseline">
          <span
            className="font-heading font-bold text-2xl tracking-tight"
            style={{ color: variant === 'white' ? colors.text : colors.primary }}
          >
            AZ Global
          </span>
        </div>
        <span
          className="font-sans text-xs font-medium tracking-wide"
          style={{ color: variant === 'white' ? colors.text + 'CC' : colors.text + '99' }}
        >
          TRANSLATIONS
        </span>
      </div>
    </div>
  );
}
