import type { ReactNode } from 'react';

interface TooltipProps {
  label: string;
  children: ReactNode;
  className?: string;
}

const Tooltip = ({ label, children, className = '' }: TooltipProps) => {
  return (
    <span className={`tooltip-wrap ${className}`} tabIndex={0}>
      {children}
      <span className="tooltip-bubble" role="tooltip">{label}</span>
    </span>
  );
};

export default Tooltip;
