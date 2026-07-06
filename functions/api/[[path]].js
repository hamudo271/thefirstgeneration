/**
 * Cloudflare Pages Function — catch-all for /api/*.
 *
 * On Cloudflare Pages there is no Express server, so API routes that the Node
 * backend provides (/api/content, /api/auth/*, /api/uploads) do not exist here.
 * Without this, those paths would fall through to the SPA `_redirects` rule and
 * return index.html (HTTP 200 HTML) — which breaks ContentContext (it would try
 * to deep-merge an HTML string over the defaults). Returning a clean JSON 404
 * instead lets the frontend fall back to shared/content-defaults.js gracefully.
 *
 * More specific functions (e.g. functions/api/contact.js) take precedence over
 * this catch-all, so /api/contact is unaffected.
 */
export function onRequest() {
  return new Response(
    JSON.stringify({ error: "This API endpoint is not available on the static (Cloudflare Pages) deployment." }),
    { status: 404, headers: { "Content-Type": "application/json" } }
  );
}
