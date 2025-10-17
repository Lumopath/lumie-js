export interface Metric {
  id: string;
  name: string;
  value: number;
  unit?: string | null;
  description?: string | null;
  category: string;
  recordedAt: string;
  formattedValue: string;
  status: string;
  companyName?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface MetricsResponse {
  metrics: Metric[];
}

