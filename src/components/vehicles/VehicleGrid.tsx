"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import Select from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import VehicleCard from "./VehicleCard";
import type { Vehicle } from "@/data/vehicles";

const PAGE_SIZE = 6;

const sorts = {
  "Featured": () => 0,
  "Price: low to high": (a: Vehicle, b: Vehicle) => a.price - b.price,
  "Price: high to low": (a: Vehicle, b: Vehicle) => b.price - a.price,
  "Newest": (a: Vehicle, b: Vehicle) => b.year - a.year,
  "Lowest mileage": (a: Vehicle, b: Vehicle) => a.mileage - b.mileage,
} as const;
type SortKey = keyof typeof sorts;

const unique = (values: string[]) => [...new Set(values)].sort();

export default function VehicleGrid({ vehicles }: { vehicles: Vehicle[] }) {
  const [brand, setBrand] = useState("");
  const [body, setBody] = useState("");
  const [condition, setCondition] = useState("");
  const [sort, setSort] = useState<SortKey>("Featured");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const options = useMemo(
    () => ({
      brands: unique(vehicles.map((v) => v.brand)),
      bodies: unique(vehicles.map((v) => v.body)),
      conditions: unique(vehicles.map((v) => v.condition)),
    }),
    [vehicles],
  );

  const results = useMemo(
    () =>
      vehicles
        .filter(
          (v) =>
            (!brand || v.brand === brand) &&
            (!body || v.body === body) &&
            (!condition || v.condition === condition),
        )
        .sort(sorts[sort]),
    [vehicles, brand, body, condition, sort],
  );

  // Any filter change starts the list from the first page again.
  const update =
    <T,>(setter: (v: T) => void) =>
    (value: T) => {
      setter(value);
      setVisible(PAGE_SIZE);
    };

  const filtered = Boolean(brand || body || condition);
  const reset = () => {
    setBrand("");
    setBody("");
    setCondition("");
    setVisible(PAGE_SIZE);
  };

  return (
    <div>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="heading text-h2">Our luxury cars</h2>
          <p className="meta mt-3" aria-live="polite">
            {results.length} {results.length === 1 ? "vehicle" : "vehicles"}
            {filtered ? " match your filters" : " in stock"}
          </p>
        </div>

        <div role="group" aria-label="Filter and sort vehicles" className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
          <Select label="Brand" placeholder="All brands" value={brand} options={options.brands} onChange={update(setBrand)} />
          <Select label="Body type" placeholder="All types" value={body} options={options.bodies} onChange={update(setBody)} />
          <Select label="Condition" placeholder="Any condition" value={condition} options={options.conditions} onChange={update(setCondition)} />
          <Select
            label="Sort by"
            placeholder="Sort: Featured"
            value={sort === "Featured" ? "" : sort}
            options={Object.keys(sorts).filter((k) => k !== "Featured")}
            onChange={(v) => setSort((v || "Featured") as SortKey)}
          />
        </div>
      </div>

      {results.length > 0 ? (
        <ul className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {results.slice(0, visible).map((v) => (
            <li key={v.slug} className="animate-[fade-up_600ms_var(--ease-out)]">
              <VehicleCard vehicle={v} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-12 flex flex-col items-center gap-6 rounded-lg border border-line-soft py-24 text-center">
          <p className="text-lead">No vehicles match those filters.</p>
          <Button variant="outline" onClick={reset}>
            <RotateCcw aria-hidden className="size-4" /> Clear filters
          </Button>
        </div>
      )}

      {visible < results.length && (
        <div className="mt-16 flex justify-center">
          <Button variant="light" onClick={() => setVisible((n) => n + PAGE_SIZE)}>
            Load more ({results.length - visible})
          </Button>
        </div>
      )}
    </div>
  );
}
