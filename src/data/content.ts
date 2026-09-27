// Static editorial content: team, testimonials, FAQs, features, marques, stats.

export type TeamMember = {
  name: string;
  role: string;
  /** Portrait path. Leave undefined until a photo is supplied. */
  image?: string;
};

// Portraits go in /public/assets/images/team/ — add the path here once available.
export const team: TeamMember[] = [
  { name: "Marcus Hale", role: "Founder & Director" },
  { name: "Elena Voss", role: "Head of Acquisitions" },
  { name: "Daniel Reyes", role: "Client Advisor" },
];

export type Testimonial = {
  quote: string;
  name: string;
  location: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "The whole process took two visits. They sourced the exact specification I wanted and handled everything from inspection to delivery.",
    name: "James Whitfield",
    location: "London, UK",
    rating: 5,
  },
  {
    quote:
      "No pressure, no games. Honest about the car's history and fair on the trade-in. I will be back for the next one.",
    name: "Sofia Marchetti",
    location: "Milan, IT",
    rating: 5,
  },
  {
    quote:
      "They found a low-mileage Panamera 4S in the colour I had been chasing for a year. Delivered detailed and fully serviced.",
    name: "Oliver Brandt",
    location: "Munich, DE",
    rating: 5,
  },
];

export const faqs = [
  {
    question: "What is your vehicle return policy?",
    answer:
      "Every vehicle comes with a seven-day, 500-mile return window. If the car is not right, return it in the condition it was delivered for a full refund.",
  },
  {
    question: "Do you provide in-house financing?",
    answer:
      "Yes. We work with a panel of specialist lenders and can arrange finance, lease purchase or balloon structures. Pre-qualification uses a soft search only.",
  },
  {
    question: "How do I schedule a test drive?",
    answer:
      "Use the contact form or call the showroom. Test drives are by appointment so the car is prepared and a specialist is available to accompany you.",
  },
  {
    question: "Are maintenance services included?",
    answer:
      "Certified vehicles include a twelve-month service plan. Extended plans covering servicing, tyres and consumables are available on every car we sell.",
  },
  {
    question: "Do you accept part-exchange?",
    answer:
      "We accept part-exchange on most prestige and performance vehicles. Send us the registration and mileage for a same-day valuation.",
  },
];

export type Feature = {
  title: string;
  description: string;
  icon: "car" | "shield" | "wallet" | "wrench";
  image: string;
  focus: string;
};

export const features: Feature[] = [
  {
    title: "Wide Selection",
    description:
      "A curated inventory from the world's most respected performance and luxury marques.",
    icon: "car",
    image: "/assets/images/sections/detail-grille.jpg",
    focus: "50% 45%",
  },
  {
    title: "Extended Warranty",
    description:
      "Comprehensive coverage plans that give you peace of mind on every mile.",
    icon: "shield",
    image: "/assets/images/sections/detail-taillights.jpg",
    focus: "50% 55%",
  },
  {
    title: "Flexible Financing",
    description:
      "Tailored finance structures designed around your portfolio, not a template.",
    icon: "wallet",
    image: "/assets/images/sections/detail-wheel.jpg",
    focus: "40% 60%",
  },
  {
    title: "Certified Inspection",
    description:
      "A 160-point inspection by marque-trained technicians before any car reaches the floor.",
    icon: "wrench",
    image: "/assets/images/cars/lamborghini-aventador-s.jpg",
    focus: "40% 62%",
  },
];

// Marques shown in the scrolling strip under the hero, rendered as text wordmarks.
export const marques = [
  "Ferrari",
  "Lamborghini",
  "Porsche",
  "Bugatti",
  "Mercedes-Benz",
  "BMW M",
  "Audi Sport",
];

export const stats = [
  { value: 120, prefix: "$", suffix: "M+", label: "In vehicles delivered" },
  { value: 12, prefix: "", suffix: "+", label: "Years of experience" },
  { value: 98, prefix: "", suffix: "%", label: "Client satisfaction" },
];
