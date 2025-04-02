import api from './api';

export interface Invoice {
  id: string;
  clientNumber: string;
  installationNumber: string;
  referenceMonth: string;
  totalAmount: number;
  
  // Campos de energia e valores
  electricityConsumption: number;
  electricityValue: number;
  sceeConsumption: number;
  sceeValue: number;
  compensatedEnergyConsumption: number;
  compensatedEnergyValue: number;
  publicLightingContribution: number;
  
  // Campos calculados para o dashboard
  totalEnergyConsumption: number;
  totalValueWithoutGD: number;
  gdSavings: number;
  energyConsumption: number;
  compensatedEnergy: number;
}

export const invoiceService = {
  getAll: async (): Promise<Invoice[]> => {
    const response = await api.get('/invoices');
    return response.data;
  },
  
  getById: async (id: string): Promise<Invoice> => {
    const response = await api.get(`/invoices/${id}`);
    return response.data;
  }
};
