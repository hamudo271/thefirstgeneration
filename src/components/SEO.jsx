import React from "react";
import { Helmet } from "react-helmet-async";

/**
 * Site-wide SEO component. Renders <title>, meta description, canonical,
 * Open Graph, Twitter card tags consistently for every page.
 *
 * Usage:
 *   <SEO
 *     title="회사 소개"
 *     description="더퍼스트제너레이션의 정체성과 팀을 소개합니다."
 *     path="/company"
 *   />
 *
 * Props:
 *   title       – Page-specific title. Rendered as `${title} | ${SITE_NAME}`.
 *                 If omitted, falls back to SITE_NAME alone.
 *   description – Meta description. Trimmed to ~160 chars for best SERP display.
 *   path        – Route path (e.g. "/company"). Used to build canonical + og:url.
 *   image       – Optional absolute/relative image URL. Defaults to site og-image.
 *   type        – OpenGraph type. Default "website".
 *   noIndex     – If true, emits robots=noindex,nofollow.
 */

const SITE_NAME = "더퍼스트제너레이션";
const SITE_URL = "https://thefirstmcn.com"; // primary domain (non-www canonical)
const DEFAULT_DESCRIPTION =
  "더퍼스트제너레이션은 영상 제작·크리에이터 매니지먼트·광고 콘텐츠를 원스톱으로 제공하는 MCN 전문 기업입니다. 누적 조회수 1억 7천만 회의 경험으로 성과를 만듭니다.";
const DEFAULT_OG_IMAGE = "/og-image.png";

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noIndex = false,
}) {
  const isHome = path === "/";
  // Brand-first title on the homepage (matches how Google renders the brand
  // entry); "page | brand" elsewhere for clarity in tabs and SERPs.
  const fullTitle = !title
    ? SITE_NAME
    : isHome
    ? `${SITE_NAME} | ${title}`
    : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  // BreadcrumbList helps Google understand the site hierarchy (better sitelinks).
  const breadcrumb = !isHome && title && {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: title, item: url },
    ],
  };

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      {breadcrumb && (
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      )}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={SITE_NAME} />
      <meta property="og:locale" content="ko_KR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}

export { SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION };
