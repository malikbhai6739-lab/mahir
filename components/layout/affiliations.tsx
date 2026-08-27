import Image from "next/image";

const affiliationLogos = [
  ["Al Baraka", "/affiliations/al-baraka.svg"],
  ["Amir Adnan", "/affiliations/amir-adnan.svg"],
  ["Avient", "/affiliations/avient.svg"],
  ["Beaconhouse International College", "/affiliations/beaconhouse-international-college.svg"],
  ["Caprinos", "/affiliations/caprinos.svg"],
  ["Daraz", "/affiliations/daraz.svg"],
  ["DingCops", "/affiliations/dingcops.svg"],
  ["Easypaisa", "/affiliations/easypaisa.svg"],
  ["Emporium Mall", "/affiliations/emporium-mall.svg"],
  ["Gul Ahmed", "/affiliations/gul-ahmed.svg"],
  ["Hardee's", "/affiliations/hardees.svg"],
  ["i2c", "/affiliations/i2c.svg"],
  ["Ilaan", "/affiliations/ilaan.svg"],
  ["J. Junaid Jamshed", "/affiliations/j-junaid-jamshed.svg"],
  ["KSB", "/affiliations/ksb.svg"],
  ["MTronic", "/affiliations/mtronic.svg"],
  ["Packages Mall", "/affiliations/packages-mall.svg"],
  ["RepairDesk", "/affiliations/repairdesk.svg"],
  ["Sir Ganga Ram Hospital", "/affiliations/sir-ganga-ram-hospital.svg"],
  ["Tasdeeq Pakistan", "/affiliations/tasdeeq-pakistan.png"],
  ["TPL Maps", "/affiliations/tpl-maps.svg"],
  ["TransData", "/affiliations/transdata.svg"],
] as const;

function LogoSet() {
  return affiliationLogos.map(([name, src]) => (
    <div
      key={`${name}-${src}`}
      className="flex h-20 w-48 shrink-0 items-center justify-center bg-white px-5 sm:h-24 sm:w-56 sm:px-6"
    >
      <Image
        src={src}
        alt={name}
        width={224}
        height={96}
        className="h-auto max-h-14 w-auto max-w-full object-contain sm:max-h-16"
      />
    </div>
  ));
}

export function Affiliations() {
  return (
    <section aria-labelledby="affiliations-heading" className="overflow-hidden border-t border-line bg-white py-12 sm:py-14">
      <div className="site-container">
        <h2 id="affiliations-heading" className="text-center text-xl font-semibold text-foreground sm:text-2xl">
          Our Affiliations
        </h2>
      </div>
      <div className="affiliation-marquee mt-8" aria-label="Mahir affiliations">
        <div className="affiliation-track">
          <div className="affiliation-set" aria-hidden="true">
            <LogoSet />
          </div>
          <div className="affiliation-set" aria-hidden="true">
            <LogoSet />
          </div>
        </div>
      </div>
    </section>
  );
}
