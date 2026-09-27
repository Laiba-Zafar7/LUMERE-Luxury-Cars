import { ChevronDown } from "lucide-react";

type SelectProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  /** Label for the empty option, e.g. "All brands". */
  placeholder: string;
};

/** Native select styled to match the reference's compact filter controls. */
export default function Select({
  label,
  value,
  options,
  onChange,
  placeholder,
}: SelectProps) {
  return (
    <label className="relative block min-w-0 flex-1 sm:w-44 sm:flex-none">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-10 w-full cursor-pointer appearance-none rounded-sm border bg-charcoal pr-9 pl-3 text-meta transition-colors duration-(--transition-fast) outline-none hover:border-white/40 focus-visible:border-white ${
          value ? "border-accent text-white" : "border-line text-white-soft"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-grey"
      />
    </label>
  );
}
