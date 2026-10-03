import Link from "next/link";
import Reveal from "@/components/animations/Reveal";
import {
  mainLinks,
  socialLinks,
  utilityLinks,
  contactDetails,
} from "@/data/navigation";

const columns = [
  { title: "/Main Pages", links: mainLinks, external: false },
  { title: "/Social", links: socialLinks, external: true },
  { title: "/Utility", links: utilityLinks, external: false },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black pt-24 lg:pt-32">
      <Reveal className="container-page">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p data-reveal className="heading max-w-md text-h3 text-balance">
              Making your car-buying experience transparent.
            </p>
            <address
              data-reveal
              className="mt-8 flex flex-col gap-1 text-meta not-italic text-grey"
            >
              <span>{contactDetails.address}</span>
              <a href={`mailto:${contactDetails.email}`} className="hover:text-white">
                {contactDetails.email}
              </a>
              <a
                href={`tel:${contactDetails.phone.replace(/[^+\d]/g, "")}`}
                className="hover:text-white"
              >
                {contactDetails.phone}
              </a>
            </address>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title.slice(1)} data-reveal>
                <p className="mb-5 text-micro text-grey-dark">{col.title}</p>
                <ul className="flex flex-col gap-2.5 text-small">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {col.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-white-soft transition-colors hover:text-white"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-white-soft transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-2 border-t border-line-soft pt-6 text-micro text-grey-dark sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} LUMÈRE Motors. All rights reserved.</p>
          <p>Static showroom — prices exclude taxes and delivery.</p>
        </div>
      </Reveal>

      {/* Giant wordmark, cropped by the page edge */}
      <div aria-hidden className="mt-8 overflow-hidden">
        <p className="wordmark translate-y-[14%] text-center">LUMÈRE</p>
      </div>
    </footer>
  );
}
