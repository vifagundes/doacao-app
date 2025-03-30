export interface Institution {
  id: string;
  name: string;
  cnpj: string;
  description: string;
  needs: string;
  contact: {
    phone: string;
    email: string;
  };
  createdAt: Date;
}