export interface Donation {
  id: string;
  institutionId: string;
  institutionName: string;
  amount: number | string;
  donorName?: string;
  donorEmail?: string;
  message?: string;
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  createdAt: Date;
}