import { useEffect, useState } from "react";
import { Invoice, invoiceService } from "@/services/invoiceService";
import { StatCard } from "./StatCard";
import { EnergyChart } from "./EnergyChart";
import { FinancialChart } from "./FinancialChart";
import { formatNumber, formatCurrency } from "@/lib/utils";

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

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const data = await invoiceService.getAll();
        
        if (data && data.length > 0) {
          setInvoices(data);
          setUsingSampleData(false);
        } else {
          // Se não houver dados, use os dados de exemplo
          console.log("Sem dados reais disponíveis, usando dados de exemplo");
          setInvoices(sampleInvoices);
          setUsingSampleData(true);
        }
        
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar faturas:", err);
        setError("Erro ao carregar os dados das faturas. Usando dados de exemplo.");
        setInvoices(sampleInvoices);
        setUsingSampleData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  // Calcular totais para os cards
  const totals = invoices.reduce(
    (acc, invoice) => {
      return {
        totalEnergyConsumption: acc.totalEnergyConsumption + (invoice.energyConsumption || 0),
        totalCompensatedEnergy: acc.totalCompensatedEnergy + (invoice.compensatedEnergy || 0),
        totalValueWithoutGD: acc.totalValueWithoutGD + (invoice.totalValueWithoutGD || 0),
        totalGDSavings: acc.totalGDSavings + (invoice.gdSavings || 0),
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
