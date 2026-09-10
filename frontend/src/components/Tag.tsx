interface TagProps {
  children: string;
  variant?: 'solid' | 'outline';
  className?: string;
}

const Tag = ({ children, variant = 'solid', className = '' }: TagProps) => {
  const base =
    variant === 'solid'
      ? { background: 'linear-gradient(135deg, #FF9148, #E8722E)', color: '#fff' }
      : { border: '1.5px solid #FF9148', color: '#FF9148' };

  return (
    <span className={`tag-pill ${className}`} style={base}>
      {children}
    </span>
  );
};

export default Tag;
