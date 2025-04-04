import { useEffect, useState, useMemo } from "react";
import { Invoice, invoiceService, InvoiceFilters, Client } from "@/services/invoiceService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadInvoiceDialog } from "@/components/invoice/UploadInvoiceDialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingSampleData, setUsingSampleData] = useState(false);

  // Filtros
  const [clientNumber, setClientNumber] = useState<string>("");
  const [referenceMonth, setReferenceMonth] = useState<string>("");

  // Dados para os dropdowns
  const [clients, setClients] = useState<Client[]>([]);
  const [months, setMonths] = useState<string[]>([]);

  // Estado para o popover do cliente
  const [openClientPopover, setOpenClientPopover] = useState(false);

  // Cliente selecionado para exibição
  const [selectedClientLabel, setSelectedClientLabel] = useState<string>("");

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

  // Carregar dados para os filtros
  const loadFilterData = async () => {
    try {
      // Carregar meses de referência
      const monthsData = await invoiceService.getReferenceMonths();
      setMonths(monthsData);

      // Carregar clientes
      const clientsData = await invoiceService.getClients();
      setClients(clientsData);
    } catch (err) {
      console.error("Erro ao carregar dados para filtros:", err);
    }
  };

  const fetchInvoices = async (filters?: InvoiceFilters) => {
    try {
      setLoading(true);
      const data = await invoiceService.getAll(filters);

      if (data && data.length > 0) {
        setInvoices(data);
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

        if (filters?.startMonth) {
          filteredSampleData = filteredSampleData.filter(
            invoice => invoice.referenceMonth === filters.startMonth
          );
        }

        setInvoices(filteredSampleData);
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

  const handleApplyFilters = () => {
    const filters: InvoiceFilters = {};

    if (clientNumber) filters.clientNumber = clientNumber;
    if (referenceMonth && referenceMonth !== 'all') filters.startMonth = referenceMonth;

    fetchInvoices(filters);
  };

  const handleClearFilters = () => {
    setClientNumber("");
    setSelectedClientLabel("");
    setReferenceMonth("");
    fetchInvoices();
  };

  const handleSelectClient = (clientNumber: string) => {
    setClientNumber(clientNumber);
    const selectedClient = clients.find(c => c.clientNumber === clientNumber);
    if (selectedClient) {
      setSelectedClientLabel(`${selectedClient.clientNumber} (${selectedClient.installationNumber})`);
    }
    setOpenClientPopover(false);
  };

  useEffect(() => {
    fetchInvoices();
    loadFilterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Faturas</h1>

      {/* Filtros */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientNumber">Cliente</Label>
              <Popover open={openClientPopover} onOpenChange={setOpenClientPopover}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openClientPopover}
                    className="w-full justify-between"
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

            <div className="space-y-2">
              <Label htmlFor="referenceMonth">Mês de Referência</Label>
              <Select value={referenceMonth} onValueChange={setReferenceMonth}>
                <SelectTrigger id="referenceMonth">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end gap-2">
              <Button onClick={handleApplyFilters} className="flex-1 cursor-pointer">Aplicar Filtros</Button>
              <Button onClick={handleClearFilters} variant="outline" className="flex-1 cursor-pointer">Limpar</Button>
            </div>

            <div className="mt-4">
              <UploadInvoiceDialog onSuccess={() => fetchInvoices()} />
            </div>
          </div>
        </CardContent>
      </Card>

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
