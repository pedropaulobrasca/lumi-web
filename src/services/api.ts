import axios from 'axios';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para exibir erros de rede
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Erro na requisição API:', error);
    
    if (error.code === 'ERR_NETWORK') {
      toast.error('Erro de conexão. Verifique se o servidor está rodando.');
    }
    
    return Promise.reject(error);
  }
);

export default api;
