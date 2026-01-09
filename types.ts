export enum Page {
  STRATEGIC_PULSE = 'Strategic Pulse',
  PIPELINE_GROWTH = 'Pipeline & Growth',
  NETWORK_HEALTH = 'Network & Dealer Health',
  FIELD_EXECUTION = 'Execution & Field Activities'
}

export interface FilterState {
  state: string;
  tmName: string;
  productGroup: string;
  dateRange: string;
}

export interface KPIProps {
  title: string;
  value: string;
  plan: string;
  actual: string;
  variance: number; // percentage
  trend?: 'up' | 'down' | 'neutral';
  source: string;
  isCurrency?: boolean;
}