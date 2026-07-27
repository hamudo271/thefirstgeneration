/**
 * Structured-data (JSON-LD) builders for the static prerender.
 *
 * Everything here is derived from shared/content-defaults.js so the markup can
 * never drift from what the page actually shows. Emitted into the <head> of
 * each prerendered HTML file by scripts/prerender.mjs.
 *
 * Hierarchy:
 *   LocalBusiness  → every page (identity + NAP + sameAs for Naver/Google)
 *   FAQPage        → /            (rich result eligible)
 *   Service        → /service/:id (one per service, linked back to the org)
 *   Blog           → /column
 *   ItemList       → /portfolio
 *   BreadcrumbList → emitted by <SEO> via Helmet, captured automatically
 */
import { defaults } from "../shared/content-defaults.js";

export const SITE_URL = "https://thefirstmcn.com";
const ORG_ID = `${SITE_URL}/#organization`;

const f = defaults.global?.footer ?? {};

// footer stores display strings ("Tel: 010-…"); strip the labels for schema.
const strip = (v = "", label) => String(v).replace(new RegExp(`^${label}:\\s*`, "i"), "").trim();
const PHONE = strip(f.phone, "Tel");
const EMAIL = strip(f.email, "E-mail");
const ADDRESS = f.address || "광주광역시 서구 운천로 247 4층";
const SAME_AS = (f.socials ?? []).map((s) => s.href).filter(Boolean);

export const NAVER_MAP_URL = `https://map.naver.com/p/search/${encodeURIComponent(ADDRESS)}`;

/** Organization identity as a LocalBusiness — the anchor every page references. */
export const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": ORG_ID,
  name: "더퍼스트제너레이션",
  alternateName: ["THE FIRST GENERATION", "더퍼스트제너레이션 MCN"],
  url: SITE_URL,
  logo: `${SITE_URL}/brand/favicon.png`,
  image: `${SITE_URL}/og-image.png`,
  description:
    "광주광역시 서구에 위치한 MCN·영상 제작 기업. 유튜브 채널 운영 대행, 숏폼 영상 제작, 인플루언서 섭외, 기업 홍보 영상 제작을 제공합니다.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "운천로 247 4층",
    addressLocality: "서구",
    addressRegion: "광주광역시",
    addressCountry: "KR",
  },
  telephone: PHONE ? `+82-${PHONE.replace(/^0/, "").replace(/-/g, "-")}` : undefined,
  email: EMAIL || undefined,
  areaServed: [
    { "@type": "City", name: "광주광역시" },
    { "@type": "Country", name: "대한민국" },
  ],
  knowsLanguage: ["ko"],
  priceRange: "₩₩",
  // Naver weighs a map/place connection heavily for local queries. This is an
  // address search link (not a fabricated place id) — swap it for the real
  // 스마트플레이스 URL once that listing exists.
  hasMap: NAVER_MAP_URL,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: SAME_AS,
};

/** FAQPage from the home FAQ block — eligible for Naver/Google rich results. */
export function faqPage() {
  const items = defaults.home?.faq?.items ?? [];
  if (!items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

/** One Service node per service-detail page, provided by the LocalBusiness. */
export function service(id) {
  const svc = (defaults.serviceDetail?.services?.items ?? []).find((s) => s.id === id);
  if (!svc) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.seoTitle || svc.title,
    alternateName: svc.title,
    description: svc.desc,
    serviceType: svc.title,
    url: `${SITE_URL}/service/${svc.id}`,
    image: svc.heroImage ? `${SITE_URL}${svc.heroImage}` : undefined,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: "광주광역시" },
  };
}

/** Blog listing for /column. */
export function blog() {
  const items = defaults.column?.list?.items ?? [];
  if (!items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "더퍼스트제너레이션 미디어 인사이트",
    url: `${SITE_URL}/column`,
    publisher: { "@id": ORG_ID },
    blogPost: items.map((it) => ({
      "@type": "BlogPosting",
      headline: it.title,
      url: `${SITE_URL}/column/${it.slug}`,
      mainEntityOfPage: `${SITE_URL}/column/${it.slug}`,
      description: it.desc,
      datePublished: String(it.date || "").replace(/\./g, "-"),
      author: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
    })),
  };
}

/** Portfolio as a plain ItemList of the source videos (kept minimal = valid). */
export function portfolioList() {
  const items = defaults.portfolio?.projects?.items ?? [];
  if (!items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "광주 영상 제작 사례",
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.youtube.com/watch?v=${it.videoId}`,
      name: it.title ? `${it.title} (${it.category})` : it.category,
    })),
  };
}

/** Route → extra JSON-LD nodes (LocalBusiness is added to every page). */
export function schemasFor(routePath) {
  const out = [];
  if (routePath === "/") {
    const faq = faqPage();
    if (faq) out.push(faq);
  } else if (routePath === "/column") {
    const b = blog();
    if (b) out.push(b);
  } else if (routePath === "/portfolio") {
    const l = portfolioList();
    if (l) out.push(l);
  } else if (routePath.startsWith("/column/")) {
    const slug = routePath.replace("/column/", "");
    const a = (defaults.column?.list?.items ?? []).find((x) => x.slug === slug);
    if (a) {
      out.push({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: a.title,
        description: a.desc,
        url: `${SITE_URL}/column/${a.slug}`,
        mainEntityOfPage: `${SITE_URL}/column/${a.slug}`,
        datePublished: String(a.date || "").replace(/\./g, "-"),
        articleSection: a.badge,
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        inLanguage: "ko-KR",
      });
    }
  } else if (routePath.startsWith("/service/")) {
    const id = routePath.replace("/service/", "");
    const s = service(id);
    if (s) out.push(s);
    // Each service page now carries its own FAQ block — expose it too.
    const svc = (defaults.serviceDetail?.services?.items ?? []).find((x) => x.id === id);
    const items = svc?.faq?.items ?? [];
    if (items.length) {
      out.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((it) => ({
          "@type": "Question",
          name: it.q,
          acceptedAnswer: { "@type": "Answer", text: it.a },
        })),
      });
    }
  }
  return out;
}
