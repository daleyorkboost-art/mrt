import { Check } from 'lucide-react';

type SelectFieldProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

export function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-ink">
      <span>{label}</span>
      <select
        className="min-h-12 rounded-[8px] border border-line bg-white px-4 text-ink outline-none transition focus:border-gold"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

type MultiSelectProps = {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
};

export function MultiSelect({ options, selected, onToggle }: MultiSelectProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => {
        const active = selected.includes(option);
        return (
          <button
            key={option}
            className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-bold transition ${
              active ? 'border-gold bg-gold text-white shadow-sm' : 'border-line bg-white text-mist hover:border-gold hover:text-gold'
            }`}
            onClick={() => onToggle(option)}
            type="button"
          >
            {active && <Check aria-hidden className="h-4 w-4" />}
            {option}
          </button>
        );
      })}
    </div>
  );
}
