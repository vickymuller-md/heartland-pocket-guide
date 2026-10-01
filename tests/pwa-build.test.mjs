import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

const output = new URL('../dist/', import.meta.url);
const pages = readdirSync(new URL('../src/pages/', import.meta.url))
  .filter((name) => name.endsWith('.astro'))
  .map((name) => name === 'index.astro' ? '/' : name.replace(/\.astro$/, ''));

// Observe the generated worker's actual precache/registration calls, not the
// source config. Browser installation/offline navigation is a separate check.
function workerContract() {
  const result = { entries: [], fallback: null, cleanup: false, claim: false, skipWaiting: false };
  const workbox = {
    precacheAndRoute(entries) { result.entries = entries; },
    cleanupOutdatedCaches() { result.cleanup = true; },
    clientsClaim() { result.claim = true; },
    createHandlerBoundToURL(url) { return url; },
    NavigationRoute: class { constructor(handler) { this.handler = handler; } },
    registerRoute(route) { result.fallback = route.handler; },
  };
  runInNewContext(readFileSync(new URL('sw.js', output), 'utf8'), {
    self: { define() {}, skipWaiting() { result.skipWaiting = true; } },
    define(_dependencies, factory) { factory(workbox); },
  }, { timeout: 1000 });
  return result;
}

test('the generated worker precaches every built page using the existing extensionless routes', () => {
  const { entries, fallback } = workerContract();
  assert.equal(fallback, '/');
  for (const route of pages) {
    assert.ok(entries.some((entry) => entry.url === route && entry.revision), `missing page ${route}`);
    const path = route === '/' ? 'index.html' : `${route}/index.html`;
    const html = readFileSync(new URL(path, output), 'utf8');
    assert.match(html, /rel="manifest"/);
    assert.match(html, /manifest\.webmanifest/);
    assert.match(html, /<script[^>]+src="\/_astro\//);
  }
});

test('every precached resource exists, including all figures and install icons', () => {
  const { entries } = workerContract();
  for (const { url } of entries) {
    const file = pages.includes(url) ? (url === '/' ? 'index.html' : `${url}/index.html`) : url;
    assert.ok(existsSync(new URL(file, output)), `missing precache resource ${url}`);
  }
  for (const directory of ['figures', 'icons']) {
    for (const file of readdirSync(new URL(`../public/${directory}/`, import.meta.url))) {
      assert.ok(entries.some((entry) => entry.url === `${directory}/${file}`), `uncached ${directory}/${file}`);
    }
  }
});

test('the install manifest and automatic worker update contract remain intact', () => {
  const manifest = JSON.parse(readFileSync(new URL('manifest.webmanifest', output), 'utf8'));
  assert.equal(manifest.start_url, '/');
  assert.equal(manifest.scope, '/');
  assert.equal(manifest.display, 'standalone');
  assert.ok(manifest.icons.some((icon) => icon.sizes === '192x192'));
  assert.ok(manifest.icons.some((icon) => icon.sizes === '512x512' && icon.purpose === 'maskable'));
  const worker = workerContract();
  assert.ok(worker.cleanup && worker.claim && worker.skipWaiting);
  const bundles = readdirSync(new URL('_astro/', output)).filter((name) => name.endsWith('.js'))
    .map((name) => readFileSync(new URL(`_astro/${name}`, output), 'utf8')).join('\n');
  assert.match(bundles, /\/sw\.js/);
  assert.match(bundles, /register/);
});
