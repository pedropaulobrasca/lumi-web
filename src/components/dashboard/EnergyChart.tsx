import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";
import { Invoice } from "@/services/invoiceService";
import { formatNumber } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EnergyChartProps {
  invoices: Invoice[];
}

export function EnergyChart({ invoices }: EnergyChartProps) {
  // Preparar os dados para o gráfico
  const data = invoices.map((invoice) => ({
    month: invoice.referenceMonth,
    "Consumo de Energia (kWh)": invoice.energyConsumption,
    "Energia Compensada (kWh)": invoice.compensatedEnergy,
  }));

  // Formatador personalizado para o tooltip
  const formatTooltip = (value: number) => {
    return `${formatNumber(value)} kWh`;
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Resultados de Energia (kWh)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data} 
              margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
              barSize={20} // Reduzindo o tamanho das barras
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                angle={-45} 
                textAnchor="end" 
                height={70} 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tickFormatter={(value) => `${formatNumber(Number(value))}`} 
                width={80}
              />
              <Tooltip 
                formatter={formatTooltip}
                cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
              />
              <Legend />
              <Bar
                dataKey="Consumo de Energia (kWh)"
                fill="#3b82f6" // blue
                radius={[4, 4, 0, 0]} // Bordas arredondadas no topo
              />
              <Bar
                dataKey="Energia Compensada (kWh)"
                fill="#22c55e" // green
                radius={[4, 4, 0, 0]} // Bordas arredondadas no topo
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
