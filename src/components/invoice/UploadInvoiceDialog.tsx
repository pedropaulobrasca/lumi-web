import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { invoiceService } from "@/services/invoiceService";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface UploadInvoiceDialogProps {
  onSuccess: () => void;
}

export function UploadInvoiceDialog({ onSuccess }: UploadInvoiceDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Verificar se o arquivo é um PDF
      if (selectedFile.type !== "application/pdf") {
        toast.error("Por favor, selecione um arquivo PDF.");
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Por favor, selecione um arquivo para fazer upload.");
      return;
    }

    try {
      setIsUploading(true);
      console.log("Iniciando upload da fatura...");
      const result = await invoiceService.uploadInvoice(file);
      console.log("Resultado do upload:", result);
      toast.success("Fatura enviada com sucesso!");
      setFile(null);
      setOpen(false);
      onSuccess();
    } catch (error: unknown) {
      const err = error as { 
        response?: { 
          status?: number; 
          data?: { 
            message?: string;
            error?: string;
          } 
        } 
      };
      console.error("Erro ao fazer upload da fatura:", error);
      console.error("Detalhes do erro:", err.response);
      
      // Verificar se é um erro de fatura duplicada
      if (err.response?.status === 409) {
        toast.error("Esta fatura já existe no sistema.");
      } else if (err.response?.data?.error) {
        // Exibir mensagem de erro específica do servidor
        toast.error(`Erro: ${err.response.data.error}`);
      } else if (err.response?.data?.message) {
        // Mensagem alternativa de erro
        toast.error(`Erro: ${err.response.data.message}`);
      } else {
        // Mensagem genérica para outros erros
        toast.error("Erro ao fazer upload da fatura. Por favor, tente novamente.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <Upload className="mr-2 h-4 w-4" />
          Enviar Fatura
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enviar Nova Fatura</DialogTitle>
          <DialogDescription>
            Faça upload de uma fatura de energia em formato PDF.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="text-right">
              Arquivo
            </Label>
            <Input
              id="file"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="col-span-3"
            />
          </div>
          {file && (
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-4">
                <p className="text-sm text-muted-foreground">
                  Arquivo selecionado: <span className="font-medium">{file.name}</span>
                </p>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="cursor-pointer"
          >
            {isUploading ? "Enviando..." : "Enviar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
