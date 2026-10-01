import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { RED_FLAG_ALERTS } from '../src/data/remote-monitoring.ts';

test('low-pressure guidance preserves escalation and requires clinician-directed medication decisions', () => {
  const hypotension = RED_FLAG_ALERTS.find(criterion => /SBP.*90/.test(criterion.finding));
  assert.ok(hypotension);
  assert.match(hypotension.action, /Contact the provider/);
  assert.match(hypotension.action, /only as directed by a clinician/);
  assert.match(hypotension.action, /clinician-written plan/);
  assert.match(hypotension.action, /do not make independent medication changes/);
  const html = readFileSync(new URL('../dist/red-flags/index.html', import.meta.url), 'utf8');
  assert.match(html, /only as directed by a clinician/);
  assert.match(html, /contact the provider immediately/);
  assert.doesNotMatch(html, /hold ARNI\/MRA and the diuretic dose|recheck vitals in 20 minutes/i);
});
