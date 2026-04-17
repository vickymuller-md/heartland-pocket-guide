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
  { code: '99453', description: 'RPM initial setup', reimbursement: '$19-21' },
  { code: '99454', description: 'RPM monthly device (≥16 days data)', reimbursement: '$48-55' },
  { code: '99457', description: 'RPM first 20 min management', reimbursement: '$48-52' },
  { code: '99458', description: 'RPM additional 20 min', reimbursement: '$38-42' },
  { code: '98975-98981', description: 'RTM codes (similar structure)', reimbursement: 'Similar range' },
  { code: 'G0511', description: 'RHC/FQHC Comprehensive Care Management', reimbursement: 'Consolidated' },
];

export const REVENUE_POTENTIAL =
  '$150-200/month per high-risk patient with full capture';

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
