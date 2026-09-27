export type BodyType = "Coupe" | "Sedan" | "SUV" | "Grand Tourer" | "Hypercar";
export type Condition = "New" | "Certified" | "Pre-owned";

/** An editorial crop of the vehicle's photograph, used by the detail gallery. */
export type GalleryCrop = {
  position: string;
  scale: number;
};

export type Vehicle = {
  slug: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  transmission: "Automatic" | "Manual";
  fuel: "Petrol" | "Hybrid" | "Electric";
  body: BodyType;
  condition: Condition;
  topSpeed: number; // km/h
  engine: string;
  power: number; // hp
  acceleration: string; // 0–100 km/h
  exterior: string;
  interior: string;
  image: string;
  /** focal point for cover crops, e.g. "50% 60%" */
  focus: string;
  gallery: GalleryCrop[];
  summary: string;
  highlights: string[];
  featured?: boolean;
};

const crops = (focus: string): GalleryCrop[] => [
  { position: focus, scale: 1 },
  { position: "30% 55%", scale: 1.35 },
  { position: "70% 60%", scale: 1.5 },
  { position: "50% 80%", scale: 1.25 },
];

const base = "/assets/images/cars";

export const vehicles: Vehicle[] = [
  {
    slug: "ferrari-812-superfast",
    brand: "Ferrari",
    model: "812 Superfast",
    year: 2023,
    price: 389000,
    mileage: 3100,
    transmission: "Automatic",
    fuel: "Petrol",
    body: "Grand Tourer",
    condition: "Certified",
    topSpeed: 340,
    engine: "6.5L V12",
    power: 789,
    acceleration: "2.9s",
    exterior: "Rosso Corsa",
    interior: "Nero leather",
    image: `${base}/ferrari-812-superfast.jpg`,
    focus: "50% 52%",
    gallery: crops("50% 52%"),
    summary:
      "A naturally aspirated V12 front-engined grand tourer. Single owner, full Ferrari service history and seven-year maintenance programme remaining.",
    highlights: [
      "Carbon-fibre driver zone",
      "Suspension lifter",
      "Passenger display",
      "Scuderia shields",
    ],
    featured: true,
  },
  {
    slug: "lamborghini-huracan-evo",
    brand: "Lamborghini",
    model: "Huracán EVO",
    year: 2023,
    price: 268000,
    mileage: 5400,
    transmission: "Automatic",
    fuel: "Petrol",
    body: "Coupe",
    condition: "Certified",
    topSpeed: 325,
    engine: "5.2L V10",
    power: 631,
    acceleration: "2.9s",
    exterior: "Grigio Titans",
    interior: "Nero Ade Alcantara",
    image: `${base}/lamborghini-huracan-evo.jpg`,
    focus: "60% 62%",
    gallery: crops("60% 62%"),
    summary:
      "Rear-wheel steering, LDVI predictive dynamics and a V10 that revs past 8,000 rpm. Presented in matte grey with bronze forged wheels.",
    highlights: [
      "Lifting system",
      "Sensonum audio",
      "Carbon ceramic brakes",
      "Forged 20-inch wheels",
    ],
    featured: true,
  },
  {
    slug: "lamborghini-aventador-s",
    brand: "Lamborghini",
    model: "Aventador S",
    year: 2022,
    price: 425000,
    mileage: 6800,
    transmission: "Automatic",
    fuel: "Petrol",
    body: "Coupe",
    condition: "Pre-owned",
    topSpeed: 350,
    engine: "6.5L V12",
    power: 730,
    acceleration: "2.9s",
    exterior: "Arancio Atlas",
    interior: "Nero Ade / Arancio stitch",
    image: `${base}/lamborghini-aventador-s.jpg`,
    focus: "40% 62%",
    gallery: crops("40% 62%"),
    summary:
      "The last of the pure V12 Lamborghini flagships. Four-wheel steering, pushrod suspension and a presence nothing else on the road can match.",
    highlights: [
      "Four-wheel steering",
      "Transparent engine bonnet",
      "Branding pack",
      "Front axle lift",
    ],
    featured: true,
  },
  {
    slug: "bmw-m4-competition",
    brand: "BMW",
    model: "M4 Competition",
    year: 2024,
    price: 94500,
    mileage: 2200,
    transmission: "Automatic",
    fuel: "Petrol",
    body: "Coupe",
    condition: "New",
    topSpeed: 290,
    engine: "3.0L I6 Twin-Turbo",
    power: 503,
    acceleration: "3.9s",
    exterior: "Fire Orange",
    interior: "Black Merino",
    image: `${base}/bmw-m4-competition.jpg`,
    focus: "50% 72%",
    gallery: crops("50% 72%"),
    summary:
      "M Driver's Package, carbon bucket seats and a twin-turbo straight six. A daily-usable coupe with genuine track capability.",
    highlights: [
      "M Carbon bucket seats",
      "M Driver's Package",
      "Laser headlights",
      "Harman Kardon audio",
    ],
    featured: true,
  },
  {
    slug: "porsche-panamera-4s",
    brand: "Porsche",
    model: "Panamera 4S",
    year: 2023,
    price: 148000,
    mileage: 8900,
    transmission: "Automatic",
    fuel: "Petrol",
    body: "Sedan",
    condition: "Certified",
    topSpeed: 289,
    engine: "2.9L V6 Twin-Turbo",
    power: 443,
    acceleration: "4.2s",
    exterior: "Jet Black Metallic",
    interior: "Race-Tex / Carmine",
    image: `${base}/porsche-panamera-4s.jpg`,
    focus: "55% 80%",
    gallery: crops("55% 80%"),
    summary:
      "A four-door with a sports-car soul. Sport exhaust, rear-axle steering and Porsche Approved warranty until 2027.",
    highlights: [
      "Rear-axle steering",
      "Sport Chrono package",
      "Burmester audio",
      "Panoramic roof",
    ],
  },
  {
    slug: "mercedes-s-class",
    brand: "Mercedes-Benz",
    model: "S 580 4MATIC",
    year: 2024,
    price: 132000,
    mileage: 4100,
    transmission: "Automatic",
    fuel: "Hybrid",
    body: "Sedan",
    condition: "New",
    topSpeed: 250,
    engine: "4.0L V8 EQ Boost",
    power: 496,
    acceleration: "4.4s",
    exterior: "Obsidian Black",
    interior: "Macchiato Nappa",
    image: `${base}/mercedes-s-class.jpg`,
    focus: "40% 82%",
    gallery: crops("40% 82%"),
    summary:
      "The benchmark for executive travel. Executive rear seat package, rear-axle steering and augmented-reality head-up display.",
    highlights: [
      "Executive rear seats",
      "AR head-up display",
      "Burmester 4D audio",
      "E-Active Body Control",
    ],
  },
  {
    slug: "audi-r8-v10",
    brand: "Audi",
    model: "R8 V10 Performance",
    year: 2022,
    price: 172000,
    mileage: 9600,
    transmission: "Automatic",
    fuel: "Petrol",
    body: "Coupe",
    condition: "Pre-owned",
    topSpeed: 330,
    engine: "5.2L V10",
    power: 602,
    acceleration: "3.1s",
    exterior: "Mythos Black",
    interior: "Black / Red stitch",
    image: `${base}/audi-r8-v10.jpg`,
    focus: "50% 55%",
    gallery: crops("50% 55%"),
    summary:
      "The final generation of Audi's naturally aspirated V10 supercar. Quattro all-wheel drive with a carbon exterior pack.",
    highlights: [
      "Carbon exterior pack",
      "Bang & Olufsen audio",
      "Laser lights",
      "Dynamic steering",
    ],
  },
  {
    slug: "bmw-5-series",
    brand: "BMW",
    model: "M550i xDrive",
    year: 2023,
    price: 78500,
    mileage: 11200,
    transmission: "Automatic",
    fuel: "Petrol",
    body: "Sedan",
    condition: "Certified",
    topSpeed: 250,
    engine: "4.4L V8 Twin-Turbo",
    power: 523,
    acceleration: "3.8s",
    exterior: "Carbon Black",
    interior: "Cognac Dakota",
    image: `${base}/bmw-5-series.jpg`,
    focus: "45% 58%",
    gallery: crops("45% 58%"),
    summary:
      "A discreet V8 executive saloon. Adaptive M suspension, Bowers & Wilkins audio and BMW Laserlight.",
    highlights: [
      "Adaptive M suspension",
      "Bowers & Wilkins audio",
      "Laserlight",
      "Soft-close doors",
    ],
  },
  {
    slug: "bmw-4-series-gran-coupe",
    brand: "BMW",
    model: "M440i Gran Coupé",
    year: 2024,
    price: 64900,
    mileage: 3500,
    transmission: "Automatic",
    fuel: "Petrol",
    body: "Coupe",
    condition: "New",
    topSpeed: 250,
    engine: "3.0L I6 Turbo",
    power: 382,
    acceleration: "4.6s",
    exterior: "Black Sapphire",
    interior: "Tacora Red",
    image: `${base}/bmw-4-series-gran-coupe.jpg`,
    focus: "50% 70%",
    gallery: crops("50% 70%"),
    summary:
      "Four doors, a hatch and a silky straight six. The most practical way to drive a BMW coupe every day.",
    highlights: [
      "M Sport package",
      "Head-up display",
      "Adaptive LED lights",
      "Heated steering wheel",
    ],
  },
  {
    slug: "audi-a7-sportback",
    brand: "Audi",
    model: "RS 7 Sportback",
    year: 2023,
    price: 121000,
    mileage: 7400,
    transmission: "Automatic",
    fuel: "Hybrid",
    body: "Sedan",
    condition: "Certified",
    topSpeed: 305,
    engine: "4.0L V8 TFSI",
    power: 591,
    acceleration: "3.6s",
    exterior: "Nardo Grey",
    interior: "Black Valcona",
    image: `${base}/audi-a7-sportback.jpg`,
    focus: "50% 76%",
    gallery: crops("50% 76%"),
    summary:
      "A five-door fastback with supercar pace. Dynamic Plus package, ceramic brakes and matrix LED lighting.",
    highlights: [
      "Dynamic Plus package",
      "Ceramic brakes",
      "HD Matrix LED",
      "Massage seats",
    ],
  },
  {
    slug: "audi-r8-rwd",
    brand: "Audi",
    model: "R8 V10 RWD",
    year: 2021,
    price: 159000,
    mileage: 12800,
    transmission: "Automatic",
    fuel: "Petrol",
    body: "Coupe",
    condition: "Pre-owned",
    topSpeed: 327,
    engine: "5.2L V10",
    power: 562,
    acceleration: "3.2s",
    exterior: "Tango Red",
    interior: "Black Nappa",
    image: `${base}/audi-r8-rear.jpg`,
    focus: "50% 45%",
    gallery: crops("50% 45%"),
    summary:
      "Rear-wheel drive, a naturally aspirated V10 and a chassis tuned for balance over outright grip. The purist's R8.",
    highlights: [
      "Sports exhaust",
      "Magnetic ride",
      "Carbon engine bay",
      "Virtual cockpit",
    ],
  },
  {
    slug: "bugatti-chiron",
    brand: "Bugatti",
    model: "Chiron Sport",
    year: 2021,
    price: 3250000,
    mileage: 1900,
    transmission: "Automatic",
    fuel: "Petrol",
    body: "Hypercar",
    condition: "Certified",
    topSpeed: 420,
    engine: "8.0L W16 Quad-Turbo",
    power: 1479,
    acceleration: "2.4s",
    exterior: "Nocturne / Blue carbon",
    interior: "Beluga Black",
    image: `${base}/bugatti-chiron-divo.jpg`,
    focus: "35% 55%",
    gallery: crops("35% 55%"),
    summary:
      "Sixteen cylinders, four turbochargers and 1,479 horsepower. Delivered new through Bugatti Paris and maintained by the factory.",
    highlights: [
      "Exposed blue carbon",
      "Sky View roof",
      "Sport-tuned chassis",
      "Factory service history",
    ],
    featured: true,
  },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export const formatMileage = (value: number) =>
  `${new Intl.NumberFormat("en-US").format(value)} mi`;

export const vehicleName = (v: Vehicle) => `${v.brand} ${v.model}`;

export const getVehicle = (slug: string) =>
  vehicles.find((v) => v.slug === slug);

export const featuredVehicles = vehicles.filter((v) => v.featured);

export const relatedVehicles = (slug: string, count = 3) => {
  const current = getVehicle(slug);
  const rest = vehicles.filter((v) => v.slug !== slug);
  const sameBody = rest.filter((v) => v.body === current?.body);
  return [...sameBody, ...rest.filter((v) => !sameBody.includes(v))].slice(
    0,
    count,
  );
};
