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
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FinancialChartProps {
  invoices: Invoice[];
}

export function FinancialChart({ invoices }: FinancialChartProps) {
  // Preparar os dados para o gráfico
  const data = invoices.map((invoice) => ({
    month: invoice.referenceMonth,
    "Valor Total sem GD (R$)": invoice.totalValueWithoutGD,
    "Economia GD (R$)": invoice.gdSavings,
  }));

  // Formatador personalizado para o tooltip
  const formatTooltip = (value: number) => {
    return formatCurrency(value);
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Resultados Financeiros (R$)</CardTitle>
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
                tickFormatter={(value) => formatCurrency(Number(value))} 
                width={80}
              />
              <Tooltip 
                formatter={formatTooltip}
                cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
              />
              <Legend />
              <Bar
                dataKey="Valor Total sem GD (R$)"
                fill="#a855f7" // purple
                radius={[4, 4, 0, 0]} // Bordas arredondadas no topo
              />
              <Bar
                dataKey="Economia GD (R$)"
                fill="#f97316" // orange
                radius={[4, 4, 0, 0]} // Bordas arredondadas no topo
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
