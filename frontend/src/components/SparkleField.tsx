const SPARKLES = [
  { top: '12%', left: '8%', delay: '0s', size: 3 },
  { top: '22%', left: '85%', delay: '0.6s', size: 2 },
  { top: '68%', left: '92%', delay: '1.4s', size: 3 },
  { top: '80%', left: '15%', delay: '2.1s', size: 2 },
  { top: '40%', left: '48%', delay: '0.9s', size: 2 },
  { top: '15%', left: '60%', delay: '1.8s', size: 3 },
  { top: '55%', left: '5%', delay: '2.6s', size: 2 },
  { top: '88%', left: '70%', delay: '1.2s', size: 3 },
];

const SparkleField = () => {
  return (
    <div className="sparkle-field">
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="sparkle"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
};

export default SparkleField;
