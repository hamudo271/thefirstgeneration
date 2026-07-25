/**
 * Build-time RSS generator.
 *
 * Naver Search Advisor ("웹마스터도구") accepts an RSS feed in addition to a
 * sitemap and uses it to pick up new content faster than crawling alone.
 * Google ignores it, so this is a Naver-specific win.
 *
 * Writes public/rss.xml from the column articles in content-defaults.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { defaults } from "../shared/content-defaults.js";

const SITE_URL = "https://thefirstmcn.com";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../public/rss.xml");

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// "2026.06.15" → RFC-822, which is what RSS 2.0 requires.
const rfc822 = (dotted) => {
  const [y, m, d] = String(dotted || "").split(".").map(Number);
  const date = y && m && d ? new Date(Date.UTC(y, m - 1, d)) : new Date();
  return date.toUTCString();
};

const items = (defaults.column?.list?.items ?? [])
  .map(
    (it) => `    <item>
      <title>${esc(it.title)}</title>
      <link>${SITE_URL}/column</link>
      <guid isPermaLink="false">${SITE_URL}/column#${esc(it.title).slice(0, 40)}</guid>
      <description>${esc(it.desc)}</description>
      <category>${esc(it.badge)}</category>
      <pubDate>${rfc822(it.date)}</pubDate>
    </item>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>더퍼스트제너레이션 | 미디어 인사이트</title>
    <link>${SITE_URL}/column</link>
    <description>${esc(defaults.column?.seo?.description ?? "")}</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

writeFileSync(OUT, xml, "utf8");
console.log(`[rss] wrote ${(defaults.column?.list?.items ?? []).length} items to public/rss.xml`);
