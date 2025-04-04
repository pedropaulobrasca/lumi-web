import { useEffect, useState } from "react";
import { Invoice, invoiceService, Client, InvoiceFilters } from "@/services/invoiceService";
import { StatCard } from "./StatCard";
import { EnergyChart } from "./EnergyChart";
import { FinancialChart } from "./FinancialChart";
import { formatNumber, formatCurrency } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

// Dados de exemplo para quando não há dados reais disponíveis
const sampleInvoices: Invoice[] = [
  {
    id: "1",
    clientNumber: "7202210726",
    installationNumber: "3001422762",
    referenceMonth: "JAN/2025",
    totalAmount: 107.38,
    electricityConsumption: 100,
    electricityValue: 95.86,
    sceeConsumption: 2220,
    sceeValue: 1135.57,
    compensatedEnergyConsumption: 2220,
    compensatedEnergyValue: -1081.87,
    publicLightingContribution: 40.45,
    totalEnergyConsumption: 2320,
    totalValueWithoutGD: 1271.88,
    gdSavings: 1081.87,
    energyConsumption: 2320,
    compensatedEnergy: 2220
  },
  {
    id: "2",
    clientNumber: "7202210726",
    installationNumber: "3001422762",
    referenceMonth: "FEV/2025",
    totalAmount: 115.67,
    electricityConsumption: 110,
    electricityValue: 105.45,
    sceeConsumption: 2450,
    sceeValue: 1250.32,
    compensatedEnergyConsumption: 2450,
    compensatedEnergyValue: -1190.55,
    publicLightingContribution: 40.45,
    totalEnergyConsumption: 2560,
    totalValueWithoutGD: 1396.22,
    gdSavings: 1190.55,
    energyConsumption: 2560,
    compensatedEnergy: 2450
  },
  {
    id: "3",
    clientNumber: "7202210726",
    installationNumber: "3001422762",
    referenceMonth: "MAR/2025",
    totalAmount: 98.76,
    electricityConsumption: 90,
    electricityValue: 86.27,
    sceeConsumption: 2100,
    sceeValue: 1073.79,
    compensatedEnergyConsumption: 2100,
    compensatedEnergyValue: -1021.75,
    publicLightingContribution: 40.45,
    totalEnergyConsumption: 2190,
    totalValueWithoutGD: 1200.51,
    gdSavings: 1021.75,
    energyConsumption: 2190,
    compensatedEnergy: 2100
  }
];

export function Dashboard() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingSampleData, setUsingSampleData] = useState(false);
  
  // Estado para o filtro de cliente
  const [clientNumber, setClientNumber] = useState<string>("");
  const [clients, setClients] = useState<Client[]>([]);
  const [openClientPopover, setOpenClientPopover] = useState(false);
  const [selectedClientLabel, setSelectedClientLabel] = useState<string>("");

  // Função para carregar os clientes
  const loadClients = async () => {
    try {
      const clientsData = await invoiceService.getClients();
      setClients(clientsData);
    } catch (err) {
      console.error("Erro ao carregar clientes:", err);
    }
  };

  // Função para buscar faturas com filtros
  const fetchInvoices = async (filters?: InvoiceFilters) => {
    try {
      setLoading(true);
      const data = await invoiceService.getAll(filters);
      
      if (data && data.length > 0) {
        // Garantir que todos os dados são válidos
        const validatedData = data.map(invoice => ({
          ...invoice,
          // Garantir que os valores numéricos sejam números válidos
          energyConsumption: typeof invoice.energyConsumption === 'number' ? invoice.energyConsumption : 0,
          compensatedEnergy: typeof invoice.compensatedEnergy === 'number' ? invoice.compensatedEnergy : 0,
          totalValueWithoutGD: typeof invoice.totalValueWithoutGD === 'number' ? invoice.totalValueWithoutGD : 0,
          gdSavings: typeof invoice.gdSavings === 'number' ? invoice.gdSavings : 0
        }));
        
        setInvoices(validatedData);
        setUsingSampleData(false);
      } else {
        // Se não houver dados, use os dados de exemplo
        console.log("Sem dados reais disponíveis, usando dados de exemplo");
        
        // Filtrar os dados de exemplo conforme os filtros
        let filteredSampleData = [...sampleInvoices];
        
        if (filters?.clientNumber) {
          filteredSampleData = filteredSampleData.filter(
            invoice => invoice.clientNumber === filters.clientNumber
          );
        }
        
        setInvoices(filteredSampleData);
        setUsingSampleData(true);
      }
      
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar faturas:", err);
      setError("Erro ao carregar os dados das faturas. Usando dados de exemplo.");
      
      // Se houver filtro de cliente, filtrar os dados de exemplo
      let filteredSampleData = [...sampleInvoices];
      if (filters?.clientNumber) {
        filteredSampleData = filteredSampleData.filter(
          invoice => invoice.clientNumber === filters.clientNumber
        );
      }
      
      setInvoices(filteredSampleData);
      setUsingSampleData(true);
    } finally {
      setLoading(false);
    }
  };

  // Função para selecionar um cliente
  const handleSelectClient = (clientNumber: string) => {
    setClientNumber(clientNumber);
    const selectedClient = clients.find(c => c.clientNumber === clientNumber);
    setSelectedClientLabel(selectedClient ? 
      `${selectedClient.clientNumber} (${selectedClient.installationNumber})` : "");
    setOpenClientPopover(false);
    
    // Aplicar o filtro
    const filters: InvoiceFilters = { clientNumber };
    fetchInvoices(filters);
  };

  // Função para limpar o filtro
  const handleClearFilter = () => {
    setClientNumber("");
    setSelectedClientLabel("");
    fetchInvoices();
  };

  // Efeito para carregar os dados iniciais
  useEffect(() => {
    fetchInvoices();
    loadClients();
  }, []);

  // Calcular totais para os cards
  const totals = invoices.reduce(
    (acc, invoice) => {
      // Garantir que todos os valores sejam números válidos
      const energyConsumption = typeof invoice.energyConsumption === 'number' ? invoice.energyConsumption : 0;
      const compensatedEnergy = typeof invoice.compensatedEnergy === 'number' ? invoice.compensatedEnergy : 0;
      const totalValueWithoutGD = typeof invoice.totalValueWithoutGD === 'number' ? invoice.totalValueWithoutGD : 0;
      const gdSavings = typeof invoice.gdSavings === 'number' ? invoice.gdSavings : 0;
      
      return {
        totalEnergyConsumption: acc.totalEnergyConsumption + energyConsumption,
        totalCompensatedEnergy: acc.totalCompensatedEnergy + compensatedEnergy,
        totalValueWithoutGD: acc.totalValueWithoutGD + totalValueWithoutGD,
        totalGDSavings: acc.totalGDSavings + gdSavings,
      };
    },
    {
      totalEnergyConsumption: 0,
      totalCompensatedEnergy: 0,
      totalValueWithoutGD: 0,
      totalGDSavings: 0,
    }
  );

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard de Energia</h1>
      
      {/* Filtro de Cliente */}
      <div className="mb-6 p-4 border rounded-lg bg-card">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="space-y-2 flex-1">
            <Label htmlFor="client">Cliente</Label>
            <Popover open={openClientPopover} onOpenChange={setOpenClientPopover}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openClientPopover}
                  className="w-full justify-between cursor-pointer"
                >
                  {selectedClientLabel || "Selecione um cliente"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Buscar cliente..." />
                  <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {clients.map((client) => (
                        <CommandItem
                          key={client.clientNumber}
                          value={client.clientNumber}
                          onSelect={handleSelectClient}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              clientNumber === client.clientNumber ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {client.clientNumber} ({client.installationNumber})
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          
          <Button 
            onClick={handleClearFilter} 
            variant="outline" 
            className="cursor-pointer"
            disabled={!clientNumber}
          >
            Limpar Filtro
          </Button>
        </div>
      </div>
      
      {usingSampleData && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
          <p className="font-bold">Atenção</p>
          <p>Usando dados de exemplo para visualização. {error && error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Consumo Total de Energia" 
          value={`${formatNumber(totals.totalEnergyConsumption)} kWh`}
          description="Soma do consumo de energia de todas as faturas"
        />
        <StatCard 
          title="Energia Compensada Total" 
          value={`${formatNumber(totals.totalCompensatedEnergy)} kWh`}
          description="Soma da energia compensada de todas as faturas"
        />
        <StatCard 
          title="Valor Total sem GD" 
          value={formatCurrency(totals.totalValueWithoutGD)}
          description="Soma dos valores sem GD de todas as faturas"
        />
        <StatCard 
          title="Economia Total com GD" 
          value={formatCurrency(totals.totalGDSavings)}
          description="Soma das economias com GD de todas as faturas"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <EnergyChart invoices={invoices} />
        <FinancialChart invoices={invoices} />
      </div>
    </div>
  );
}
