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

export interface InvoiceFilters {
  clientNumber?: string;
  startMonth?: string;
  endMonth?: string;
}

export interface Client {
  clientNumber: string;
  installationNumber: string;
}

export const invoiceService = {
  getAll: async (filters?: InvoiceFilters): Promise<Invoice[]> => {
    // Construir os parâmetros de consulta a partir dos filtros
    const params = new URLSearchParams();
    
    if (filters?.clientNumber) {
      params.append('clientNumber', filters.clientNumber);
    }
    
    if (filters?.startMonth) {
      params.append('startMonth', filters.startMonth);
    }
    
    if (filters?.endMonth) {
      params.append('endMonth', filters.endMonth);
    }
    
    // Adicionar os parâmetros à URL se houver filtros
    const queryString = params.toString();
    const url = queryString ? `/invoices?${queryString}` : '/invoices';
    
    const response = await api.get(url);
    return response.data;
  },
  
  getReferenceMonths: async (): Promise<string[]> => {
    const response = await api.get('/invoices/reference-months/list');
    return response.data;
  },
  
  getClients: async (): Promise<Client[]> => {
    const response = await api.get('/invoices/clients/list');
    return response.data;
  },
  
  getById: async (id: string): Promise<Invoice> => {
    const response = await api.get(`/invoices/${id}`);
    return response.data;
  },
  
  uploadInvoice: async (file: File): Promise<{ id: string; message: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/invoices/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  }
};
