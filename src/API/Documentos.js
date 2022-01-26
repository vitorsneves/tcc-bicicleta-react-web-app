import axios from 'axios'
import { formatDocumentResponse } from './FormatText' 

const api_url = 'https://a6e9-187-32-90-1.ngrok.io';

export const getDocumentos = async () => {
    const response =  await axios({
        method: 'get',
        url: `${api_url}/financeiro`,
        responseType: 'json'
    });

    return formatDocumentResponse(response);
}

export const postDocumento = async (documento) => {
    const valorSeparado = documento.valor.replace('.', '').split(",");
    const valor = parseInt(valorSeparado[0]) + parseInt(valorSeparado[1]) * 0.01;

    await axios({
        method: 'post',
        url: `${api_url}/cadastrar/documento`,
        data: {
            parceiroID: documento.parceiro.parceiroId,
            valor: valor,
            movimentacao: documento.movimentacao,
            observacao: documento.observacao,
            empresaId: "ade03a2a-9f87-4402-97c9-2344b839ae2c"
        }
    });
}

export const DeleteDocument = async (id) => {
    
    return await axios ({
        method: 'delete',
        url: `${api_url}/financeiro/${id}`,
        responseType: 'json'
    });
    
}