import axios from 'axios'

export const getDocumentos = async () => {
    const response =  await axios({
        method: 'get',
        url: 'https://9dcc-187-32-90-1.ngrok.io/financeiro',
        responseType: 'json'
    });

    return response;
}

export const postDocumento = async (documento) => {
    console.log(documento);

    const valorSeparado = documento.valor.replace('.', '').split(",");
    const valor = parseInt(valorSeparado[0]) + parseInt(valorSeparado[1]) * 0.01;

    await axios({
        method: 'post',
        url: 'https://9dcc-187-32-90-1.ngrok.io/cadastrar/documento',
        data: {
            parceiroID: documento.parceiro.parceiroId,
            valor: valor,
            movimentacao: documento.movimentacao,
            observacao: documento.observacao,
            empresaId: "ade03a2a-9f87-4402-97c9-2344b839ae2c"
        }
    });
}