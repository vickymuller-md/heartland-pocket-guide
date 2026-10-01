import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { HFPEF_MEDICATIONS, FINERENONE_SCENARIOS, SAFETY_GATE_RULES, SAFETY_GATE_SCOPE, NON_PHARMACOLOGICAL, GENERIC_BRIDGE_PRICE_NOTE } from '../src/data/gdmt.ts';

test('drug-specific initiation gates do not exclude finerenone at K=5.0', () => {
  const gates = HFPEF_MEDICATIONS.find((m) => m.id === 'mra-hfpef').safetyGates;
  assert.ok(gates.some((g) => g.includes('exactly 5.0 is permitted')));
  assert.ok(gates.some((g) => g.includes('Spironolactone: eGFR >30 and K+ <5.0')));
  assert.ok(!gates.includes('K+ <5.0'));
});

test('comparison evidence, generic gates and patient guidance remain qualified', () => {
  const scenarios = JSON.stringify(FINERENONE_SCENARIOS);
  assert.match(scenarios, /ARTS compared finerenone with open-label spironolactone/);
  assert.doesNotMatch(scenarios, /No head-to-head|\$500/);
  assert.ok(SAFETY_GATE_RULES.filter((r) => /K\+ >|Cr increase/.test(r.condition)).every((r) => r.condition.includes('not the finerenone rule')));
  assert.match(NON_PHARMACOLOGICAL.sodium.target, /not a universal prescription/);
});

test('built page includes scope and cost notes, not just corrected unused data', () => {
  const html = readFileSync(new URL('../dist/gdmt/index.html', import.meta.url), 'utf8');
  assert.ok(html.includes(SAFETY_GATE_SCOPE));
  assert.ok(html.includes(GENERIC_BRIDGE_PRICE_NOTE));
  assert.ok(html.includes('not a universal prescription'));
  assert.doesNotMatch(html, /No head-to-head|Generic Bridge \(~\$|\$4\/month/);
});
