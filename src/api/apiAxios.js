import axios from 'axios';

// Crie uma instância separada do Axios para a API
const apiAxios = axios.create({
  baseURL: 'https://amazoras-backend.vercel.app',
});

// Adicione os interceptadores e configurações adicionais se necessário
apiAxios.interceptors.request.use(async (config) => config);

export default apiAxios;
