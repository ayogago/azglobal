// Inline SVG flags (all three are horizontal tricolors/bicolors), so no external image requests.
const FLAGS: Record<string, string[]> = {
  am: ['#D90012', '#0033A0', '#F2A800'],
  ru: ['#FFFFFF', '#0039A6', '#D52B1E'],
  ua: ['#0057B7', '#FFD700'],
};

export default function Flag({ code, className = '' }: { code: string; className?: string }) {
  const stripes = FLAGS[code] ?? [];
  const h = 18 / stripes.length;
  return (
    <svg viewBox="0 0 27 18" className={className} aria-hidden="true">
      {stripes.map((color, i) => (
        <rect key={i} x="0" y={i * h} width="27" height={h} fill={color} />
      ))}
      <rect x="0.25" y="0.25" width="26.5" height="17.5" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="0.5" />
    </svg>
  );
}
