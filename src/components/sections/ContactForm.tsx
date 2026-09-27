"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getVehicle } from "@/data/vehicles";

type Field = "name" | "email" | "phone" | "message";
type Errors = Partial<Record<Field, string>>;

const validate = (data: Record<Field, string>): Errors => {
  const errors: Errors = {};
  if (!data.name.trim()) errors.name = "Please enter your name.";
  if (!/^\S+@\S+\.\S+$/.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.phone && !/^[+\d][\d\s()-]{6,}$/.test(data.phone)) errors.phone = "Please enter a valid phone number.";
  if (data.message.trim().length < 10) errors.message = "Tell us a little more (at least 10 characters).";
  return errors;
};

/** Static form: validates on the client and shows a confirmation. No backend. */
export default function ContactForm() {
  const params = useSearchParams();
  const vehicle = getVehicle(params.get("vehicle") ?? "");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(
      (["name", "email", "phone", "message"] as Field[]).map((k) => [k, String(form.get(k) ?? "")]),
    ) as Record<Field, string>;
    const found = validate(data);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div role="status" className="flex h-full flex-col items-start justify-center gap-5 rounded-lg border border-line-soft bg-charcoal p-10">
        <CheckCircle2 aria-hidden className="size-8 text-accent" strokeWidth={1.5} />
        <h3 className="heading text-h3">Thank you.</h3>
        <p className="max-w-sm text-small text-grey">
          A specialist will be in touch within one working day. This is a
          static demo, so no message was actually sent.
        </p>
        <Button variant="outline" onClick={() => setSent(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  const input =
    "mt-2 w-full rounded-sm border bg-charcoal px-4 py-3 text-small text-white placeholder:text-grey-dark outline-none transition-colors duration-(--transition-fast) focus:border-white";
  const border = (f: Field) => (errors[f] ? "border-accent" : "border-line-soft hover:border-line");

  const field = (f: Field, label: string, props: React.InputHTMLAttributes<HTMLInputElement>, required = true) => (
    <div>
      <label htmlFor={f} className="text-meta text-white-soft">
        {label} {required && <span aria-hidden className="text-accent">*</span>}
      </label>
      <input
        id={f}
        name={f}
        aria-invalid={Boolean(errors[f])}
        aria-describedby={errors[f] ? `${f}-error` : undefined}
        className={`${input} ${border(f)}`}
        {...props}
      />
      {errors[f] && (
        <p id={`${f}-error`} className="mt-1.5 text-micro text-accent">
          {errors[f]}
        </p>
      )}
    </div>
  );

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
      {field("name", "Name", { autoComplete: "name", placeholder: "Jane Smith" })}
      <div className="grid gap-5 sm:grid-cols-2">
        {field("email", "Email", { type: "email", autoComplete: "email", placeholder: "jane@example.com" })}
        {field("phone", "Phone", { type: "tel", autoComplete: "tel", placeholder: "+1 (800) 123 4567" }, false)}
      </div>
      <div>
        <label htmlFor="message" className="text-meta text-white-soft">
          Message <span aria-hidden className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          defaultValue={vehicle ? `I'm interested in the ${vehicle.year} ${vehicle.brand} ${vehicle.model}. ` : ""}
          placeholder="How can we help?"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${input} ${border("message")} resize-y`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-micro text-accent">
            {errors.message}
          </p>
        )}
      </div>
      <Button type="submit" variant="light" className="mt-2 w-full">
        Submit
      </Button>
    </form>
  );
}
