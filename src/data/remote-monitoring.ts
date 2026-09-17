// MIRROR — source of truth: heartland-app/lib/remote-monitoring/constants.ts
// Protocol v3.3 Module 5. Do not edit without syncing upstream.

export type SeverityLevel = 'emergency' | 'urgent' | 'same-day';

export interface RedFlagAlert {
  id: string;
  finding: string;
  action: string;
  severity: SeverityLevel;
}

export interface BillingCode {
  code: string;
  description: string;
  reimbursement: string;
}

export interface TimHf2Outcome {
  outcome: string;
  result: string;
}

export interface TimHf2Evidence {
  name: string;
  year: number;
  outcomes: TimHf2Outcome[];
}

export const RED_FLAG_ALERTS: RedFlagAlert[] = [
  {
    id: 'chest-pain-syncope',
    finding: 'Chest pain, syncope',
    action: 'EMERGENCY — Call 911',
    severity: 'emergency',
  },
  {
    id: 'weight-gain-5lb',
    finding: 'Weight gain ≥5 lbs in 1 week',
    action: 'Urgent evaluation within 24h',
    severity: 'urgent',
  },
  {
    id: 'sbp-low',
    finding: 'SBP <90 mmHg with symptoms',
    action: 'Hold GDMT; call provider',
    severity: 'urgent',
  },
  {
    id: 'spo2-low',
    finding: 'SpO₂ <92% at rest (if baseline normal)',
    action: 'Urgent evaluation',
    severity: 'urgent',
  },
  {
    id: 'weight-gain-3lb',
    finding: 'Weight gain ≥3 lbs in 2 days',
    action: 'Call clinic same day',
    severity: 'same-day',
  },
  {
    id: 'dyspnea',
    finding: 'New/worsening dyspnea at rest',
    action: 'Same-day evaluation',
    severity: 'same-day',
  },
];

export const BILLING_CODES: BillingCode[] = [
  { code: '99453', description: 'RPM setup and patient education — one-time, not monthly', reimbursement: '$21.71' },
  { code: '99445', description: 'RPM device supply, 2-15 days of data in 30 days (new in CY2026)', reimbursement: '$52.11' },
  { code: '99454', description: 'RPM device supply, 16-30 days of data in 30 days', reimbursement: '$52.11' },
  { code: '99470', description: 'RPM treatment management, first 10 min (new in CY2026)', reimbursement: '$26.05' },
  { code: '99457', description: 'RPM treatment management, first 20 min', reimbursement: '$51.77' },
  { code: '99458', description: 'RPM treatment management, each additional 20 min', reimbursement: '$41.42' },
  {
    code: '98984 / 98985 / 98979',
    description: 'RTM device supply 2-15 days; RTM device supply 16-30 days; RTM management first 10 min',
    reimbursement: '$52.11 / $51.44 / $26.39',
  },
  { code: '98978 / 98986', description: 'RTM device supply, cognitive behavioral therapy', reimbursement: 'Status C — not paid under the PFS' },
];

export const BILLING_CODES_NOTE =
  'National non-facility amounts calculated from the CMS CY2026 PFS relative value file (released 30/06/2026) at the non-QP conversion factor of $33.40; verified 2026-09-17. Local rates differ — confirm current MPFS amounts for your region. The 2-15 day and 16-30 day device codes are alternatives, not additive; the same applies to the first-10-minute and first-20-minute management codes. G0511 and G0512 no longer exist in the CY2026 PFS: RHC/FQHC bill the individual codes plus APCM (G0556 $16.37, G0557 $53.78, G0558 $117.24).';

export const REVENUE_POTENTIAL =
  'Facility revenue, not clinician income: the base case is $103.88/month (99454 + 99457). The $150-200 range requires 40-60 minutes of billed management every month (99454 + 99457 + one 99458 = $145.30; + two = $186.72), and excludes 99453, which is a one-time setup.';

export const TIM_HF2_EVIDENCE: TimHf2Evidence = {
  name: 'TIM-HF2',
  year: 2018,
  outcomes: [
    {
      outcome: 'All-cause mortality',
      result: 'HR 0.70 (95% CI 0.50-0.96) — 30% reduction',
    },
    {
      outcome: 'Days lost to hospitalization',
      result: '4.88% vs 6.64%',
    },
    {
      outcome: 'Key finding',
      result: 'Patients living farther from cardiologists benefit most',
    },
  ],
};
