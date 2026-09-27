import { type Vehicle, formatMileage } from "@/data/vehicles";

export default function VehicleSpecs({ vehicle: v }: { vehicle: Vehicle }) {
  const specs = [
    ["Year", v.year],
    ["Mileage", formatMileage(v.mileage)],
    ["Engine", v.engine],
    ["Power", `${v.power} hp`],
    ["0–100 km/h", v.acceleration],
    ["Top speed", `${v.topSpeed} km/h`],
    ["Transmission", v.transmission],
    ["Fuel", v.fuel],
    ["Body", v.body],
    ["Condition", v.condition],
    ["Exterior", v.exterior],
    ["Interior", v.interior],
  ] as const;

  return (
    <dl className="grid grid-cols-2 border-t border-line-soft sm:grid-cols-3 lg:grid-cols-4">
      {specs.map(([label, value]) => (
        <div key={label} data-reveal className="border-b border-line-soft py-6 pr-4">
          <dt className="eyebrow">{label}</dt>
          <dd className="mt-2 text-lead font-medium tracking-tight">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
