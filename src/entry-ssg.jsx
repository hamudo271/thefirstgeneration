/**
 * SSG (build-time prerender) entry point.
 *
 * Mirrors main.jsx, but renders to a string instead of mounting to the DOM:
 *   • StaticRouter   instead of BrowserRouter (no window/history)
 *   • HelmetProvider with a context object so the build can read back the
 *     per-route <title>/<meta>/<link>/JSON-LD that <SEO> produced.
 *   • ContentProvider starts from shared/content-defaults.js and only fetches
 *     /api/content inside useEffect — which never runs during SSR, so the
 *     prerendered HTML always reflects the defaults (exactly what Cloudflare
 *     Pages serves, since there is no DB there).
 *
 * Used by scripts/prerender.mjs. Not shipped to the browser.
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
// React Router v7 exports StaticRouter from the core package (there is no
// react-router-dom/server subpath any more).
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { ContentProvider } from './context/ContentContext.jsx';
import App from './App.jsx';

export function render(url) {
  const helmetContext = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <ContentProvider>
          <App />
        </ContentProvider>
      </StaticRouter>
    </HelmetProvider>
  );
  return { html, helmet: helmetContext.helmet };
}
