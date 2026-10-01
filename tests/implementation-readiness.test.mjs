import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
test('published citation identifies the verified archive without relabeling its source', () => {
  const html = read('dist/about/index.html');
  assert.match(html, /https:\/\/doi.org\/10.5281\/zenodo.23076500/);
  assert.match(html, /Version 0.2.2/);
  assert.match(html, /source commit 3afd6e5/);
  assert.doesNotMatch(html, /23074675|pending publication/);
});
test('compact navigation keeps readiness reachable without the wide external CTA', () => {
  const source = read('src/components/Nav.astro');
  assert.match(source, /href: '\/readiness'/);
  assert.match(source, /relative xl:hidden/);
  assert.match(source, /group hidden[^\n]*md:inline-flex/);
  assert.match(source, /gap-3 px-4/);
});
test('built tier guidance preserves one clinical goal and pharmacy participation', () => {
  const html = read('dist/tiers/index.html');
  assert.match(html, /not a lower treatment goal/);
  assert.match(html, /Community, ambulatory or remote pharmacists/);
  assert.match(html, /Risk-led timing/);
  assert.match(html, /coordinated assistance when indicated/);
  assert.doesNotMatch(html, /Target all classes in 14 days|≥2 classes, prioritize|48–72h call, 14-day visit/);
});
test('built readiness page links the packaged exercise material and three referral contexts', () => {
  const html = read('dist/readiness/index.html');
  for (const text of ['Planned specialist consultation', 'Urgent or emergency assessment', 'Advanced HF / inpatient context', 'until an accepted transfer', 'respectfully, politely and gratefully']) assert.ok(html.includes(text), text);
  assert.match(html, /href="\/resources\/heartland-local-readiness-training.md"/);
  const pack = read('dist/resources/heartland-local-readiness-training.md');
  assert.equal([...pack.matchAll(/^\|S\d{2} —/gm)].length, 12);
  assert.doesNotMatch(pack, /\/Users\/|## 12\.|Rodrigo/);
  assert.match(read('dist/sw.js'), /resources\/heartland-local-readiness-training\.md/);
  for (const name of ['01_Pocket_Card_GDMT_v341.png', '07_Implementation_Tiers_Summary_v341.png']) {
    assert.ok(read('dist/sw.js').includes(name), `versioned card is precached: ${name}`);
    assert.ok(read('dist/cards/index.html').includes(name), `current gallery links versioned card: ${name}`);
  }
});
