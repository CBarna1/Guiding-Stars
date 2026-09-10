import { useEffect, useState } from 'react';

interface ApplicationCountdownProps {
  targetDate: Date;
  onComplete: () => void;
}

function getRemaining(targetDate: Date) {
  const diff = targetDate.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const ApplicationCountdown = ({ targetDate, onComplete }: ApplicationCountdownProps) => {
  const [remaining, setRemaining] = useState(() => getRemaining(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      const next = getRemaining(targetDate);
      setRemaining(next);
      if (!next) {
        clearInterval(interval);
        onComplete();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  if (!remaining) return null;

  const units = [
    { label: 'Days', value: remaining.days },
    { label: 'Hours', value: remaining.hours },
    { label: 'Minutes', value: remaining.minutes },
    { label: 'Seconds', value: remaining.seconds },
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden relative z-10">
      <div
        className="p-8 text-white text-center"
        style={{ background: 'linear-gradient(135deg, #FF9148 0%, #E8722E 100%)' }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Applications Open Soon</h1>
        <p className="opacity-90">Get ready — the next cohort's application window opens in:</p>
      </div>

      <div className="p-8 md:p-10">
        <div className="grid grid-cols-4 gap-3 md:gap-4">
          {units.map((u) => (
            <div key={u.label} className="text-center bg-gray-50 rounded-xl py-4 md:py-6 border border-gray-100">
              <div className="text-3xl md:text-5xl font-bold" style={{ color: '#FF9148' }}>
                {String(u.value).padStart(2, '0')}
              </div>
              <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wide mt-1">{u.label}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 mt-8 text-sm">
          This page will unlock the application form automatically the moment applications open — no need to refresh.
        </p>
        <p className="text-center text-gray-400 mt-2 text-xs">
          Opens {targetDate.toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' })}
        </p>
      </div>
    </div>
  );
};

export default ApplicationCountdown;
