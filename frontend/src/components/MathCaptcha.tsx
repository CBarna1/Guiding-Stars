import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import api from '../services/api';

export interface MathCaptchaHandle {
  refresh: () => void;
}

interface MathCaptchaProps {
  answer: string;
  onAnswerChange: (value: string) => void;
  onTokenChange: (token: string) => void;
  inputClassName?: string;
  inputFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  inputBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const MathCaptcha = forwardRef<MathCaptchaHandle, MathCaptchaProps>(
  ({ answer, onAnswerChange, onTokenChange, inputClassName, inputFocus, inputBlur }, ref) => {
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchChallenge = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get('/captcha');
        setQuestion(res.data.question);
        onTokenChange(res.data.token);
      } catch {
        setError('Could not load verification challenge. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchChallenge();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
      refresh: () => {
        onAnswerChange('');
        fetchChallenge();
      },
    }));

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Verify you're human <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-3">
          <span className="px-4 py-3 rounded-lg bg-gray-100 text-gray-800 font-semibold whitespace-nowrap">
            {loading ? 'Loading…' : `${question} =`}
          </span>
          <input
            type="number"
            inputMode="numeric"
            required
            value={answer}
            onChange={(e) => onAnswerChange(e.target.value)}
            onFocus={inputFocus}
            onBlur={inputBlur}
            className={inputClassName}
            placeholder="?"
          />
          <button
            type="button"
            onClick={fetchChallenge}
            className="btn-tactile p-3 rounded-lg border border-gray-300 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition"
            aria-label="Get a new challenge"
            title="Get a new challenge"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      </div>
    );
  }
);

MathCaptcha.displayName = 'MathCaptcha';

export default MathCaptcha;
