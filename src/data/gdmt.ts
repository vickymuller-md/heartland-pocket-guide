// MIRROR — source of truth: heartland-app/lib/gdmt/constants.ts
// Protocol v3.3 Module 2. Do not edit without syncing upstream.

export type EvidenceLevel = 'established' | 'emerging' | 'pragmatic';
export type HfType = 'hfref' | 'hfpef';

export interface Medication {
  id: string;
  drugClass: string;
  agent: string;
  startingDose: string;
  targetDose: string;
  safetyGates: string[];
  evidenceLevel: EvidenceLevel;
  evidenceContext?: string;
  priority?: number;
  notes?: string;
}

export interface FinerenoneScenario {
  clinicalScenario: string;
  suggestedApproach: string;
  rationale: string;
}

export interface PotassiumBand {
  range: string;
  finerenone: string;
  steroidalMra: string;
}

export interface MonitoringRule {
  drug: string;
  schedule: string;
  source: string;
}

export interface SafetyGateRule {
  condition: string;
  action: 'uptitrate' | 'hold';
}

export interface GenericBridgeItem {
  drugClass: string;
  agent: string;
  monthlyCost: string;
  note?: string;
}

export const HFREF_MEDICATIONS: Medication[] = [
  {
    id: 'arni',
    drugClass: 'ARNI',
    agent: 'Sacubitril/valsartan',
    startingDose: '24/26 mg BID',
    targetDose: '97/103 mg BID',
    safetyGates: [
      'SBP >100',
      'K+ <5.5',
      'eGFR <30: start at half the usual starting dose',
    ],
    evidenceLevel: 'established',
    notes:
      'ENTRESTO label 2.7 halves the starting dose below eGFR 30; the label sets no eGFR floor for ARNI. Down-titrate or interrupt for a clinically significant fall in renal function (label 5.4).',
  },
  {
    id: 'beta-blocker',
    drugClass: 'Beta-blocker',
    agent: 'Carvedilol',
    startingDose: '3.125 mg BID',
    targetDose: '25 mg BID (50 if >85kg)',
    safetyGates: ['HR >50', 'SBP >90'],
    evidenceLevel: 'established',
  },
  {
    id: 'mra',
    drugClass: 'MRA',
    agent: 'Spironolactone',
    startingDose: '12.5-25 mg daily',
    targetDose: '25-50 mg daily',
    safetyGates: [
      'eGFR >30',
      'K+ <5.0',
      'eGFR 30-50: halve the dose or 25 mg every other day',
    ],
    evidenceLevel: 'established',
    notes:
      'Dose reduction between eGFR 30 and 50 per 2022 AHA/ACC/HFSA (p. e932) and ALDACTONE label 2.2; standard daily dose above eGFR 50.',
  },
  {
    id: 'mra-eplerenone',
    drugClass: 'MRA (alternative)',
    agent: 'Eplerenone',
    startingDose: '25 mg daily',
    targetDose: '50 mg daily, preferably within 4 weeks as tolerated',
    safetyGates: ['CrCl >30 mL/min', 'K+ <=5.5 at initiation', 'No strong CYP3A inhibitor'],
    evidenceLevel: 'established',
    notes:
      'Guideline alternative to spironolactone (2022 AHA/ACC/HFSA, COR 1 A) when gynecomastia or breast pain limits it — reported in 10% of men on spironolactone in RALES. The INSPRA label uses creatinine clearance (mL/min), not eGFR, and caps the dose at 25 mg daily with a moderate CYP3A inhibitor.',
  },
  {
    id: 'sglt2i',
    drugClass: 'SGLT2i',
    agent: 'Dapagliflozin or Empagliflozin',
    startingDose: '10 mg daily',
    targetDose: '10 mg daily (no titration)',
    safetyGates: [
      'Dapagliflozin: do not initiate if eGFR <25; may continue 10 mg daily if eGFR later falls below 25',
      'Empagliflozin: no label eGFR floor for the heart failure indication',
    ],
    evidenceLevel: 'established',
    notes:
      'FARXIGA label 2.3 and JARDIANCE label 2. The eGFR 20 figure is the EMPEROR enrolment floor, not a limit in either US label.',
  },
];

export const HFPEF_MEDICATIONS: Medication[] = [
  {
    id: 'sglt2i-hfpef',
    drugClass: 'SGLT2i',
    agent: 'Dapagliflozin or Empagliflozin',
    startingDose: '10 mg daily',
    targetDose: '10 mg daily',
    safetyGates: [],
    evidenceLevel: 'established',
    evidenceContext: 'Class IIa per 2022 AHA/ACC/HFSA. EMPEROR-Preserved + DELIVER.',
    priority: 1,
  },
  {
    id: 'mra-hfpef',
    drugClass: 'MRA',
    agent: 'Finerenone (LVEF >=40% indication) or guideline-selected spironolactone',
    startingDose:
      'Finerenone 20 mg daily if eGFR >=60; 10 mg daily if eGFR >=25 to <60 / Spironolactone 12.5-25 mg daily',
    targetDose:
      'Finerenone 40 mg daily if eGFR >=60 at initiation; 20 mg daily if eGFR >=25 to <60 / Spironolactone 25-50 mg daily',
    safetyGates: [
      'Finerenone: do not initiate if K+ >5.0',
      'Finerenone: initiation not recommended below eGFR 25',
    ],
    evidenceLevel: 'established',
    evidenceContext:
      'Finerenone: FDA-labeled in adults with HF and LVEF >=40% (label rev. 8/2025), informed by FINEARTS-HF — rate ratio 0.84 (95% CI 0.74-0.95) for total worsening HF events plus CV death; CV death alone was not reduced (HR 0.93, 95% CI 0.78-1.11). Spironolactone in preserved EF: TOPCAT was negative for its primary endpoint (HR 0.89, 95% CI 0.77-1.04; P=0.14); only HF hospitalization fell (HR 0.83, 95% CI 0.69-0.99), and the favourable regional analysis is post hoc. Apply the current label, including potassium and eGFR monitoring.',
    priority: 2,
  },
  {
    id: 'glp1-ra',
    drugClass: 'GLP-1 RA',
    agent: 'Semaglutide',
    startingDose: 'Titrate to 2.4 mg weekly',
    targetDose: '2.4 mg weekly',
    safetyGates: [],
    evidenceLevel: 'emerging',
    evidenceContext:
      'STEP-HFpEF: Improved symptoms in obesity phenotype (BMI >=30). Obesity therapy with CV benefits.',
    priority: 3,
  },
  {
    id: 'diuretics',
    drugClass: 'Diuretics',
    agent: 'Loop diuretics',
    startingDose: 'PRN',
    targetDose: 'PRN',
    safetyGates: [],
    evidenceLevel: 'pragmatic',
    evidenceContext: 'Symptom/volume control.',
    priority: 4,
  },
];

export const FINERENONE_SCENARIOS: FinerenoneScenario[] = [
  {
    clinicalScenario: 'HF with LVEF >=40%; label criteria reviewed',
    suggestedApproach: 'Evaluate the current finerenone label and the patient context',
    rationale:
      'FDA-labeled indication added in 2025; verify potassium, eGFR, interactions, dose and monitoring in the current label. eGFR 25 to <60 is the reduced-dose range, not the typical scenario',
  },
  {
    clinicalScenario: 'History of hyperkalemia on MRA',
    suggestedApproach: 'No automatic preference; reassess risk and monitoring',
    rationale:
      'Finerenone can also cause hyperkalemia: in FINEARTS-HF, K+ >5.5 mmol/L was more frequent than with placebo (HR 2.16, 95% CI 1.83-2.56). No head-to-head trial against spironolactone in HF',
  },
  {
    clinicalScenario: 'Significant cost barrier',
    suggestedApproach: 'Spironolactone',
    rationale: '~$4/month generic vs. ~$500/month',
  },
  {
    clinicalScenario: 'HFrEF',
    suggestedApproach: 'Use guideline-directed HFrEF MRA selection (spironolactone or eplerenone)',
    rationale:
      'Do not substitute finerenone for established steroidal MRA therapy in HFrEF: no completed dedicated outcome trial, and the FDA label is limited to LVEF >=40%',
  },
  {
    clinicalScenario: 'Uncertain, guideline-adherent approach',
    suggestedApproach: 'Verify the current label and the heart failure guideline',
    rationale:
      'Indication, phenotype, renal function, potassium, interactions, access and monitoring all matter',
  },
];

// KERENDIA label 4, 7.1 and 8.6 (rev. 8/2025).
export const FINERENONE_CONTRAINDICATIONS: string[] = [
  'Concomitant strong CYP3A4 inhibitors (for example clarithromycin, itraconazole, ritonavir)',
  'Adrenal insufficiency',
  'Hypersensitivity to any component of the product',
];

export const FINERENONE_INTERACTIONS: string[] = [
  'Avoid grapefruit and grapefruit juice',
  'Avoid strong or moderate CYP3A4 inducers',
  'Avoid use in severe hepatic impairment (Child-Pugh C)',
];

// Finerenone column: KERENDIA label Table 3 (HF, LVEF >=40%).
// Steroidal MRA column: ALDACTONE label 5.1 and 2022 AHA/ACC/HFSA (COR 3: Harm).
export const POTASSIUM_BANDS: PotassiumBand[] = [
  {
    range: 'K+ <5.0',
    finerenone:
      'Increase to the target dose at the 4-week check (40 mg if eGFR >=60 at initiation; 20 mg if eGFR 25 to <60)',
    steroidalMra: 'Continue; uptitrate as tolerated',
  },
  {
    range: 'K+ 5.0-5.4',
    finerenone: 'Maintain the current dose',
    steroidalMra: 'Maintain the current dose; recheck',
  },
  {
    range: 'K+ 5.5-5.9',
    finerenone:
      'Decrease one step (40 to 20 mg; 20 to 10 mg). At 10 mg, withhold and restart at 10 mg once K+ <5.5',
    steroidalMra:
      'Reduce the dose or withhold; discontinue if potassium cannot be maintained <5.5',
  },
  {
    range: 'K+ >=6.0',
    finerenone: 'Withhold at any dose; restart at 10 mg once K+ <5.5',
    steroidalMra:
      'Withhold and treat the hyperkalemia; discontinue if potassium cannot be maintained <5.5',
  },
];

export const MRA_MONITORING: MonitoringRule[] = [
  {
    drug: 'Finerenone',
    schedule:
      'Potassium and eGFR before initiation, 4 weeks after initiation and 4 weeks after every dose change — the 4-week laboratory check is the titration decision point — then periodically.',
    source: 'KERENDIA label 2.1 and 2.3 (rev. 8/2025)',
  },
  {
    drug: 'Finerenone — protocol addition',
    schedule:
      'A 1-week potassium and eGFR check after initiation and after each dose change. It is added to the 4-week milestone and does not replace it.',
    source:
      'First milestone of the 2022 AHA/ACC/HFSA MRA schedule ("approximately 1 week, then 4 weeks, then every 6 months"); a protocol choice, not a label requirement',
  },
  {
    drug: 'Spironolactone',
    schedule:
      'Potassium within 1 week of initiation or titration and regularly thereafter; volume status and renal function periodically.',
    source: 'ALDACTONE label 5.1 and 5.2',
  },
  {
    drug: 'Eplerenone',
    schedule:
      'Potassium before initiation, within the first week and at one month after start or dose change, then periodically.',
    source: 'INSPRA label 2.3',
  },
];

export const SAFETY_GATE_RULES: SafetyGateRule[] = [
  { condition: 'SBP >=100', action: 'uptitrate' },
  { condition: 'HR >=50', action: 'uptitrate' },
  { condition: 'K+ <5.0', action: 'uptitrate' },
  { condition: 'SBP <90', action: 'hold' },
  { condition: 'HR <50', action: 'hold' },
  { condition: 'K+ >5.5', action: 'hold' },
  { condition: 'Cr increase >30%', action: 'hold' },
];

export const NON_PHARMACOLOGICAL = {
  sodium: { label: 'Dietary Sodium', target: '<2,000 mg/day' },
  activity: {
    label: 'Physical Activity',
    target:
      'Walking 5-10 min daily, gradually increase to 30 min moderate activity most days',
  },
  cardiacRehab: {
    label: 'Cardiac Rehabilitation',
    target: 'Class I recommendation — refer all eligible patients',
  },
} as const;

export const GENERIC_BRIDGE_ITEMS: GenericBridgeItem[] = [
  { drugClass: 'ACE inhibitor OR ARB', agent: 'Lisinopril or Losartan', monthlyCost: '$4/month' },
  { drugClass: 'Beta-blocker', agent: 'Carvedilol generic', monthlyCost: '$4/month' },
  { drugClass: 'MRA', agent: 'Spironolactone generic', monthlyCost: '$4/month' },
  { drugClass: 'Metformin', agent: 'Metformin', monthlyCost: '$4/month', note: 'if diabetic/prediabetic' },
];

export const GENERIC_BRIDGE_PRINCIPLE =
  'Generic therapy is superior to NO therapy. Never delay treatment while waiting for paperwork.';
