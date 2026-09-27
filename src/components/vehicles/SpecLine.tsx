import { Gauge, Cog, CalendarDays } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";

/** Compact "speed · transmission · year" row used on showcase cards. */
export default function SpecLine({
  vehicle,
  className = "",
}: {
  vehicle: Vehicle;
  className?: string;
}) {
  const items = [
    { icon: Gauge, label: `${vehicle.topSpeed} km/h`, sr: "Top speed" },
    { icon: Cog, label: vehicle.transmission, sr: "Transmission" },
    { icon: CalendarDays, label: String(vehicle.year), sr: "Year" },
  ];
  return (
    <ul className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-meta text-white-soft ${className}`}>
      {items.map(({ icon: Icon, label, sr }) => (
        <li key={sr} className="flex items-center gap-1.5">
          <Icon aria-hidden className="size-3.5 text-grey" strokeWidth={1.5} />
          <span className="sr-only">{sr}: </span>
          {label}
        </li>
      ))}
    </ul>
  );
}
