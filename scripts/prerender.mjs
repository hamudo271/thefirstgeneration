/**
 * Build-time prerender (SSG) — the fix for Naver.
 *
 * WHY: the site is a React SPA. Before this step every URL returned the same
 * empty `<div id="root">` shell with the home page's <title>, so Naver's
 * crawler (Yeti — which does not reliably execute JavaScript) saw 11 identical
 * blank pages. Google could render them; Naver could not.
 *
 * WHAT: after `vite build`, this renders every public route to real HTML —
 * full body copy, per-route <title>/<meta>/canonical/OG from <SEO>, plus
 * JSON-LD — and writes dist/<route>/index.html. Cloudflare Pages serves those
 * files directly (static assets win over the SPA fallback in _redirects), so
 * crawlers get complete HTML while users still get the SPA after hydration.
 *
 * Run: node scripts/prerender.mjs   (wired into `npm run build`)
 */
import { build } from "vite";
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { defaults } from "../shared/content-defaults.js";
import { localBusiness, schemasFor, SITE_URL } from "./seo-schema.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const SSG_DIR = path.join(ROOT, ".ssg");

/* ── Routes ──────────────────────────────────────────────────────────────── */
const routes = [
  "/",
  "/company",
  "/service",
  "/portfolio",
  "/pricing",
  "/column",
  "/contact",
  ...(defaults.serviceDetail?.services?.items ?? []).map((s) => `/service/${s.id}`),
  ...(defaults.column?.list?.items ?? []).map((a) => `/column/${a.slug}`),
];

// Rendered through the router's catch-all and written to dist/404.html, which
// Cloudflare Pages serves with a real 404 status. Without it the SPA fallback
// answered every unknown URL with 200 + the home page's <title> (a soft 404),
// which is what pushed measured title duplication to 100%.
const NOT_FOUND = "/__not-found__";

/* ── Per-route keywords (region + service intent, Naver-first) ───────────── */
const KEYWORDS = {
  "/": "광주 MCN, 광주 영상제작, 광주 영상 제작 업체, 유튜브 채널 운영 대행, 숏폼 영상 제작, 인플루언서 섭외, 기업 홍보영상, 더퍼스트제너레이션",
  "/company": "광주 MCN, 광주 영상제작 회사, MCN 업체, 더퍼스트제너레이션",
  "/service": "광주 영상 제작, 유튜브 대행, 숏폼 제작, 인플루언서 마케팅, 홍보영상 제작",
  "/service/service-1": "광주 유튜브 채널 운영 대행, 유튜브 대행, 유튜브 채널 관리, 유튜브 편집 대행",
  "/service/service-2": "광주 숏폼 제작, 릴스 제작, 쇼츠 제작, 숏폼 영상 편집",
  "/service/service-3": "인플루언서 섭외, 인플루언서 마케팅, 광주 인플루언서, 체험단 마케팅",
  "/service/service-4": "광주 기업 홍보영상, 회사 소개 영상, 브랜드 필름, 홍보 영상 제작",
  "/portfolio": "광주 영상 제작 사례, 영상 포트폴리오, 홍보영상 사례",
  "/pricing": "영상 제작 비용, 유튜브 대행 비용, 숏폼 제작 단가, 영상 편집 가격",
  "/column": "유튜브 채널 성장, 숏폼 노하우, 인플루언서 마케팅, 로컬 마케팅",
  "/contact": "광주 영상 제작 문의, 영상 제작 견적, 유튜브 대행 상담",
};

// Column articles inherit the column keyword set plus their own slug topic.
for (const a of defaults.column?.list?.items ?? []) {
  KEYWORDS[`/column/${a.slug}`] = `${KEYWORDS["/column"]}, ${a.badge}`;
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */

/**
 * framer-motion renders entrance variants at their `hidden` state during SSR
 * (opacity:0 / translateY). Crawlers may discount visually hidden text, so we
 * strip just those two declarations from the static HTML. The client re-renders
 * from scratch on mount, so this has no effect on the actual animations.
 */
function unhideStatic(html) {
  return html.replace(/ style="([^"]*)"/g, (whole, css) => {
    const kept = css
      .split(";")
      .map((d) => d.trim())
      .filter(Boolean)
      .filter((d) => !/^opacity:\s*0$/i.test(d))
      .filter((d) => !/^transform:\s*translateY/i.test(d));
    return kept.length ? ` style="${kept.join(";")}"` : "";
  });
}

const ldScript = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "더퍼스트제너레이션",
  url: SITE_URL,
  inLanguage: "ko-KR",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

/** Remove the template's home-page SEO tags so per-route ones can replace them. */
function stripTemplateSeo(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name="description"[^>]*>/gi, "")
    .replace(/<meta\s+name="keywords"[^>]*>/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, "")
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, "")
    .replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, "");
}

/* ── 1. Build the SSR bundle ─────────────────────────────────────────────── */
console.log("[prerender] building SSR bundle…");
await build({
  logLevel: "warn",
  build: {
    ssr: path.join(ROOT, "src/entry-ssg.jsx"),
    outDir: SSG_DIR,
    emptyOutDir: true,
    minify: false,
  },
});

const { render } = await import(pathToFileURL(path.join(SSG_DIR, "entry-ssg.js")).href);

/* ── 2. Render every route into dist/ ────────────────────────────────────── */
const template = readFileSync(path.join(DIST, "index.html"), "utf8");
const base = stripTemplateSeo(template);

// Build timestamp — a real, verifiable "last modified" for every page. Naver's
// quality scoring looks for freshness signals; without these it scored 0%.
const BUILT_AT = new Date().toISOString();

/** WebPage node carrying the freshness signal, tied back to the org. */
const webPage = (route, title) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}${route === "/" ? "/" : route}#webpage`,
  url: `${SITE_URL}${route === "/" ? "/" : route}`,
  name: title,
  inLanguage: "ko-KR",
  dateModified: BUILT_AT,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
});

let ok = 0;
for (const route of [...routes, NOT_FOUND]) {
  const { html, helmet } = render(route);

  const head = [
    helmet?.title?.toString() ?? "",
    helmet?.meta?.toString() ?? "",
    helmet?.link?.toString() ?? "",
    KEYWORDS[route] ? `<meta name="keywords" content="${KEYWORDS[route]}">` : "",
    // Freshness signals (Naver reads these; previously absent entirely).
    `<meta property="article:modified_time" content="${BUILT_AT}">`,
    `<meta name="last-modified" content="${BUILT_AT}">`,
    // BreadcrumbList comes from <SEO> via Helmet; everything else is built here.
    helmet?.script?.toString() ?? "",
    ldScript(localBusiness),
    ldScript(website),
    ldScript(webPage(route, (helmet?.title?.toString() ?? "").replace(/<[^>]*>/g, ""))),
    ...schemasFor(route).map(ldScript),
  ]
    .filter(Boolean)
    .join("\n    ");

  const page = base
    .replace("</head>", `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${unhideStatic(html)}</div>`);

  // Flat "<route>.html" rather than "<route>/index.html": Cloudflare Pages
  // serves /company straight from company.html, whereas a directory index
  // makes it 308-redirect to /company/ — which would fight the canonical and
  // the sitemap, both of which use the slash-less form.
  const outFile =
    route === NOT_FOUND
      ? path.join(DIST, "404.html")
      : route === "/"
      ? path.join(DIST, "index.html")
      : path.join(DIST, `${route}.html`);
  mkdirSync(path.dirname(outFile), { recursive: true });
  writeFileSync(outFile, page, "utf8");

  const title = (helmet?.title?.toString() ?? "").replace(/<[^>]*>/g, "");
  console.log(`[prerender] ${route.padEnd(22)} ${(html.length / 1024).toFixed(0)}KB  ${title}`);
  ok += 1;
}

rmSync(SSG_DIR, { recursive: true, force: true });
console.log(`[prerender] wrote ${ok} static HTML pages to dist/`);
