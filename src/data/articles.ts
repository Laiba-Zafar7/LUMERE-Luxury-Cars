export type Article = {
  slug: string;
  title: string;
  tag: string;
  date: string; // ISO
  excerpt: string;
  image: string;
  focus: string;
  body: { heading: string; paragraphs: string[] }[];
};

export const articles: Article[] = [
  {
    slug: "electric-vs-hybrid",
    title: "Electric vs. Hybrid: Which Modern Drivetrain Suits Your Driving?",
    tag: "Buyer's Guide",
    date: "2026-04-14",
    excerpt:
      "Range, weight, running costs and character. How to choose between a plug-in hybrid and a full EV at the top end of the market.",
    image: "/assets/images/cars/audi-a7-sportback.jpg",
    focus: "50% 70%",
    body: [
      {
        heading: "Start with how you actually drive",
        paragraphs: [
          "Most buyers overestimate how far they drive in a day and underestimate how often they take long trips. Look at the last three months of your mileage before looking at a spec sheet.",
          "If most journeys are under 60 km with a charger at home, a plug-in hybrid will run almost entirely on electricity. If you regularly cover 400 km or more in one go, charging stops become part of the experience with a full EV.",
        ],
      },
      {
        heading: "Weight changes the character",
        paragraphs: [
          "Battery packs add mass low in the chassis. That helps stability but blunts the agility that makes a sports car feel alive. Hybrids sit in between, adding torque fill without the full weight penalty.",
        ],
      },
      {
        heading: "Residual values",
        paragraphs: [
          "At the luxury end, well-specified hybrids have held value more predictably over the past three years. EV residuals depend heavily on battery warranty and software support.",
        ],
      },
    ],
  },
  {
    slug: "night-driving-led-headlights",
    title: "Night Driving Safety: The Importance of Modern LED Headlight Tech",
    tag: "Safety Tips",
    date: "2026-05-05",
    excerpt:
      "Matrix LED and laser lighting have changed what is visible after dark. Here is what the technology does and why it matters.",
    image: "/assets/images/cars/bmw-5-series.jpg",
    focus: "45% 58%",
    body: [
      {
        heading: "Illuminating the path ahead",
        paragraphs: [
          "The risk of a serious accident is significantly higher at night, despite there being far less traffic on the road. The primary factor is visibility, and traditional halogen bulbs often fall short.",
          "Matrix LED systems split the beam into dozens of individually controlled segments, keeping high beam on while carving out oncoming traffic so other drivers are not dazzled.",
        ],
      },
      {
        heading: "Laser lights and range",
        paragraphs: [
          "Laser high beams can double the usable range of a conventional LED unit. On unlit roads that is the difference between reacting and anticipating.",
        ],
      },
    ],
  },
  {
    slug: "credit-score-interest-rate",
    title: "How Your Credit Score Shapes Your Interest Rate",
    tag: "Financing",
    date: "2026-05-05",
    excerpt:
      "A small difference in score can mean a large difference in the total cost of a car. Understand the tiers before you apply.",
    image: "/assets/images/journal/autumn-road.jpg",
    focus: "50% 60%",
    body: [
      {
        heading: "Why the score matters",
        paragraphs: [
          "Lenders price risk. A higher score places you in a lower-risk tier, and on a six-figure purchase even half a percentage point adds up over the term.",
        ],
      },
      {
        heading: "What you can do before applying",
        paragraphs: [
          "Check your report for errors, keep utilisation low for the months before applying and avoid opening new lines of credit. Pre-qualifying with a soft search shows your likely rate without affecting your score.",
        ],
      },
    ],
  },
  {
    slug: "driver-assistance-explained",
    title: "Advanced Driver Assistance Systems (ADAS) Explained",
    tag: "Safety Tips",
    date: "2026-05-05",
    excerpt:
      "Adaptive cruise, lane centring and night vision. What each system does, and what it does not.",
    image: "/assets/images/cars/audi-r8-rear.jpg",
    focus: "50% 45%",
    body: [
      {
        heading: "Assistance, not autonomy",
        paragraphs: [
          "Every system on sale today requires the driver's full attention. Understanding the limits of each feature is the key to using them well.",
        ],
      },
      {
        heading: "The systems worth specifying",
        paragraphs: [
          "Adaptive cruise with stop-and-go transforms motorway traffic. Night vision with pedestrian detection is one of the few options that meaningfully changes what you can see.",
        ],
      },
    ],
  },
];

export const getArticle = (slug: string) =>
  articles.find((a) => a.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
