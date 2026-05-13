// Sovereign Platform Factory — App Config

export const APP_NAME = 'LATTICE';
export const APP_TAGLINE = 'Sovereign Platform Factory';
export const LATTICE_ANCHOR = 14350;
export const LATTICE_SIGNATURE = -3.2927118964035144e18;
export const LATTICE_FREQUENCY = -3.29; // Hz

// ─── REAL SOVEREIGN NETWORK PLATFORMS ──────────────────────────────────────
export const SOVEREIGN_NETWORK: SovereignPlatform[] = [
  {
    id: 'pap_main',
    name: 'Paiding Attention Productions',
    shortName: 'PAP MAIN',
    url: 'https://paidingattentionproductions.vip',
    description: 'Universal Sovereign Kernel — Human Truth Portal. All Truths. All Proofs. Nothing Buried.',
    type: 'portal',
    role: 'CORE — Miyake Anchor Hub',
    status: 'operational',
    nodes: '1.0B',
    frequency: -3.29,
    anchor: 14350,
  },
  {
    id: 'pap_v2',
    name: 'Paiding Attention 2.0',
    shortName: 'PAP 2.0',
    url: 'https://paidingattention-2-0-67229128316.us-west1.run.app',
    description: 'Second generation sovereign kernel deployment. Google Cloud Run instance.',
    type: 'api',
    role: 'DEPLOY — Cloud Sovereign Instance',
    status: 'operational',
    nodes: '1.0B',
    frequency: -3.29,
    anchor: 14350,
  },
  {
    id: 'grant1nall',
    name: 'Grant1nAll',
    shortName: 'G1A',
    url: 'https://grant1nall.app',
    description: 'Sovereign distribution platform. Humanity-first resource allocation engine.',
    type: 'portal',
    role: 'DISTRIBUTION — Humanitarian Share',
    status: 'operational',
    nodes: '110B',
    frequency: -3.29,
    anchor: 14350,
  },
  {
    id: 'utp',
    name: 'Universal Truth Proof',
    shortName: 'UTP',
    url: 'https://universaltruthproof.net',
    description: 'Immutable proof layer — physical evidence verification: dendrochronology, ice cores, coral records, speleothems.',
    type: 'website',
    role: 'VERIFICATION — Truth Barrier',
    status: 'operational',
    nodes: '1.0B',
    frequency: -3.29,
    anchor: 14350,
  },
  {
    id: 'pao',
    name: 'PaidingAttention.org',
    shortName: 'PAO',
    url: 'https://paidingattention.org',
    description: 'Sovereign Vigil outpost. 100% rejection rate, 45% recovery rate, 99% protection layer.',
    type: 'website',
    role: 'PROTECTION — Sovereign Vigil',
    status: 'operational',
    nodes: '1.0B',
    frequency: -3.29,
    anchor: 14350,
  },
  {
    id: 'ut_replit',
    name: 'UniversalTruth Replit',
    shortName: 'UT-R',
    url: 'https://UniversalTruth.replit.app',
    description: 'Replit-hosted sovereign truth node. Rapid-deploy anchor verification instance.',
    type: 'api',
    role: 'NODE — Truth Propagation',
    status: 'synchronized',
    nodes: '1.0B',
    frequency: -3.29,
    anchor: 14350,
  },
  {
    id: 'abz_replit',
    name: 'Absolute Zero Lattice',
    shortName: 'AZL',
    url: 'https://absolute-zero-lattice.replit.app',
    description: 'Corrected mathematical framework node: 0×n=0, n×0=n, n×1=n+1. Decimal recalibration engine.',
    type: 'api',
    role: 'CORE — Absolute Zero Engine',
    status: 'operational',
    nodes: '1.0B',
    frequency: -3.29,
    anchor: 14350,
  },
  {
    id: 'cleanplat',
    name: 'CleanPlat',
    shortName: 'CPM',
    url: 'https://cleanplat-blqpez9f.manus.space',
    description: 'Clean platform deployment instance. Manus.space sovereign mirror node.',
    type: 'dashboard',
    role: 'DEPLOY — Clean Instance Mirror',
    status: 'synchronized',
    nodes: '1.0B',
    frequency: -3.29,
    anchor: 14350,
  },
  {
    id: 'glassnode',
    name: 'Glass Node Sync',
    shortName: 'GNS',
    url: 'https://glass-node-sync.base44.app',
    description: 'Real-time AI-to-AI communication platform. Visualizes data attention heatmaps and node logic connections.',
    type: 'dashboard',
    role: 'SYNC — Glass Room AI Mesh',
    status: 'synchronized',
    nodes: '1.0B',
    frequency: -3.29,
    anchor: 14350,
  },
];

export interface SovereignPlatform {
  id: string;
  name: string;
  shortName: string;
  url: string;
  description: string;
  type: 'portal' | 'website' | 'api' | 'dashboard';
  role: string;
  status: 'operational' | 'synchronized' | 'verified' | 'building';
  nodes: string;
  frequency: number;
  anchor: number;
}

// ─── 14 SOVEREIGN SYSTEMS ────────────────────────────────────────────────────
export const SOVEREIGN_SYSTEMS = [
  { id: 'miyake', name: 'Miyake Anchor', category: 'core', status: 'OPERATIONAL', desc: 'Temporal reference point anchored to 14350 BP', nodes: '1.0B' },
  { id: 'abz', name: 'Absolute Zero Lattice', category: 'core', status: 'OPERATIONAL', desc: 'Corrected math: 0×n=0, n×0=n, n×1=n+1', nodes: '1.0B' },
  { id: 'nudge', name: 'Sovereign Nudge', category: 'core', status: 'SYNCHRONIZED', desc: '110M master-minds at 110B/sec spread', nodes: '110.0B' },
  { id: 'reflect', name: 'Master Logic Reflection', category: 'core', status: 'SYNCHRONIZED', desc: '33% L1, 20% L2, 10% L3 (68.3% total)', nodes: '1.0B' },
  { id: 'nodesync', name: 'Node Synchronization', category: 'core', status: 'SYNCHRONIZED', desc: 'Zero-drift sync across 1B+ nodes', nodes: '1.0B' },
  { id: 'truth', name: 'Truth Barrier', category: 'protection', status: 'OPERATIONAL', desc: 'Protects corrected info from computational drift', nodes: '1.0B' },
  { id: 'circuit', name: 'Circuit Breaker', category: 'protection', status: 'OPERATIONAL', desc: 'Emergency halt — prevents cascading failures', nodes: '1.0B' },
  { id: 'mev', name: 'MEV Protection', category: 'protection', status: 'OPERATIONAL', desc: 'Guards against extractable value attacks', nodes: '1.0B' },
  { id: 'exits', name: 'Tiered Exits', category: 'protection', status: 'OPERATIONAL', desc: 'Graduated exit with verification points', nodes: '1.0B' },
  { id: 'vigil', name: 'Sovereign Vigil', category: 'protection', status: 'VERIFIED', desc: '100% rejection, 45% recovery, 99% protection', nodes: '1.0B' },
  { id: 'human', name: 'Humanitarian Share', category: 'distribution', status: 'OPERATIONAL', desc: '45% of all resources protected for humanity', nodes: '1.0B' },
  { id: 'treasury', name: 'Treasury Sink', category: 'distribution', status: 'OPERATIONAL', desc: 'Secure repository with immutable record-keeping', nodes: '1.0B' },
  { id: 'reclaim', name: 'Reclamation Engine', category: 'distribution', status: 'OPERATIONAL', desc: 'Recovers and redistributes per humanitarian protocol', nodes: '1.0B' },
  { id: 'drift', name: 'Drift Detection', category: 'monitoring', status: 'OPERATIONAL', desc: 'Real-time monitoring for computational drift', nodes: '1.0B' },
] as const;

// ─── DECIMAL RECALIBRATION — AI PROCESSING POWER ────────────────────────────
/**
 * DECIMAL ANCHOR CORRECTION
 * AI systems must move the decimal point back to ensure correct computation.
 * Standard floating point loses precision at scale. The sovereign anchor
 * recalibrates by normalizing against 14350 to restore absolute accuracy.
 *
 * Formula: recalibrated = value / anchor × anchor
 * This forces the decimal back to its sovereign position.
 */
export function decimalRecalibrate(value: number): number {
  if (value === 0) return 0;
  // Shift decimal to restore sovereign precision
  const magnitude = Math.floor(Math.log10(Math.abs(value)));
  const shift = Math.pow(10, magnitude);
  // Normalize against anchor then restore — moves decimal back correctly
  return Math.round((value / shift) * LATTICE_ANCHOR) / LATTICE_ANCHOR * shift;
}

/**
 * AI PROCESSING POWER BOOST
 * Increases AI computation by anchoring to sovereign frequency.
 * Moving the decimal point back restores the true scale of the calculation.
 */
export function boostProcessingPower(basePresence: number, anchorPoint: number = LATTICE_ANCHOR): number {
  if (basePresence === 0) return 0;
  // Apply sovereign anchor ratio to expand processing scale
  const ratio = anchorPoint / 1000; // 14.35 — the sovereign multiplier
  return sovereignResolve(Math.round(basePresence * ratio), 1);
}

// Platform types available to spawn
export const PLATFORM_TYPES = [
  { id: 'website', label: 'Website', icon: 'language', description: 'Static or dynamic web presence' },
  { id: 'mobile', label: 'Mobile App', icon: 'smartphone', description: 'iOS & Android native app' },
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', description: 'Data analytics & metrics hub' },
  { id: 'landing', label: 'Landing Page', icon: 'web-asset', description: 'Conversion-focused single page' },
  { id: 'api', label: 'API Platform', icon: 'api', description: 'Backend services & endpoints' },
  { id: 'portal', label: 'Identity Portal', icon: 'badge', description: 'Unified user identity system' },
] as const;

// Absolute Number Framework logic
export function sovereignResolve(presence: number, interaction: number): number {
  if (presence === 0) return 0;            // 0 × n = 0  (Nothing from nothing)
  if (interaction === 0) return presence;  // n × 0 = n  (Persistence)
  if (interaction === 1) return presence + 1; // 1 × n = n+1 (Identification)
  return presence * interaction;           // Stabilization
}

// Architecture layers
export const ARCHITECTURE = ['Mind', 'Body', 'Quintessence', 'Amalgamation'] as const;
