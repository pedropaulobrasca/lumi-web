import { useEffect, useState, useMemo } from "react";
import { Invoice, invoiceService } from "@/services/invoiceService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingSampleData, setUsingSampleData] = useState(false);

  // Dados de exemplo para quando não há dados reais disponíveis
  const sampleInvoices = useMemo(() => [
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
  ], []);

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
  }, [sampleInvoices]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Faturas</h1>
      
      {usingSampleData && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
          <p className="font-bold">Atenção</p>
          <p>Usando dados de exemplo para visualização. {error && error}</p>
        </div>
      )}
      
      <div className="grid gap-4">
        {invoices.map((invoice) => (
          <Card key={invoice.id} className="overflow-hidden">
            <CardHeader className="bg-gray-100 dark:bg-gray-800">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Fatura {invoice.referenceMonth}</CardTitle>
                <span className="text-lg font-bold">{formatCurrency(invoice.totalAmount)}</span>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Cliente</p>
                  <p className="font-medium">{invoice.clientNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Instalação</p>
                  <p className="font-medium">{invoice.installationNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Consumo Total</p>
                  <p className="font-medium">{formatNumber(invoice.energyConsumption)} kWh</p>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Valor sem GD</p>
                  <p className="font-medium">{formatCurrency(invoice.totalValueWithoutGD)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Economia com GD</p>
                  <p className="font-medium text-green-600">{formatCurrency(invoice.gdSavings)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
