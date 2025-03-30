export interface Donation {
  id: string;
  institutionId: string;
  institutionName: string;
  amount: number | string; // Permitir string ou número para lidar com a formatação
  donorName?: string;
  donorEmail?: string;
  message?: string;
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  createdAt: Date;
}