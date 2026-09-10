import { useReveal } from '../hooks/useReveal';
import { useCountUp } from '../hooks/useCountUp';

export interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

const StatCounter = ({ stat, active }: { stat: StatItem; active: boolean }) => {
  const count = useCountUp(stat.value, active);
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold" style={{ color: '#FF9148' }}>
        {count.toLocaleString()}
        {stat.suffix}
      </div>
      <p className="mt-2 text-sm md:text-base text-gray-300 uppercase tracking-wide">{stat.label}</p>
    </div>
  );
};

const ImpactStats = ({ stats }: { stats: StatItem[] }) => {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, i) => (
        <StatCounter key={i} stat={stat} active={visible} />
      ))}
    </div>
  );
};

export default ImpactStats;
