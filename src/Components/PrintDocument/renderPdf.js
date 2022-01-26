import pdfStyles from './pdfStyles.module.css';

const numberToMoney = (number) => {
    const moneyArray = (number.toFixed(2) + '').split('.');
    const moneyString = moneyArray[0] + ',' + moneyArray[1];
    return moneyString;
}

const getPrintData = (getDocumento, id) => {
    var extenso = require('extenso');
    const dateGetter = new Date();
    const documentData = getDocumento(id);

    // Dados que serão imprimidos.
    const specificDocumentData = {
        valor: documentData.valor.toFixed(2),
        valorPorExtenso: extenso(numberToMoney(documentData.valor), { mode: 'currency' }),
        observacao: documentData.observacao,
        cidade: documentData.emP_Cidade,
        estado: documentData.emP_Estado,
        date: dateGetter.getDate() + '/' + ('0' + (dateGetter.getMonth() + 1)).slice(-2) + '/' + dateGetter.getFullYear()
    }
    let recebe = {};
    let paga = {};

    if (documentData.movimentacao === 'Recebimento') {
        // Recebedor.
        recebe.nome_razao = documentData.emP_Razao;
        recebe.cpf_cnpj = documentData.emP_Cnpj;
        recebe.logradouro = documentData.emP_Logradouro;
        recebe.numero = documentData.emP_Numero;
        recebe.complemento = documentData.emP_Complemento;
        recebe.cep = documentData.emP_Cep;
        recebe.bairro = documentData.emP_Bairro;
        recebe.cidade = documentData.emP_Cidade;
        recebe.estado = documentData.emP_Estado;

        //Pagador
        paga.nome_razao = documentData.nomE_RAZAO;
        paga.cpf_cnpj = documentData.cpF_CNPJ;
    }

    if (documentData.movimentacao === 'Pagamento') {
        // Recebedor.
        recebe.nome_razao = documentData.nomE_RAZAO;
        recebe.cpf_cnpj = documentData.cpF_CNPJ;
        recebe.logradouro = documentData.logradouro;
        recebe.numero = documentData.numero;
        recebe.complemento = documentData.complemento;
        recebe.cep = documentData.cep;
        recebe.bairro = documentData.bairro;
        recebe.cidade = documentData.cidade;
        recebe.estado = documentData.estado;

        //Pagador
        paga.nome_razao = documentData.emP_Razao;
        paga.cpf_cnpj = documentData.emP_Cnpj;
    }

    return { specificDocumentData, recebe, paga };
};

// It converts the database date format to normal format.
// 2022-01-24T15:26:09.6955542 ->  24/01/2022 15:26
// 0123456789012345678
const dbDateToNormalDate = (dbDate) => {
    let normalDate = dbDate.slice(8, 10) + '/';
    normalDate += dbDate.slice(5, 7) + '/';
    normalDate += dbDate.slice(0, 4) + ' ';

    return normalDate;
}

export const renderPdf = (getDocumento, id) => {
    const { specificDocumentData, recebe, paga } = getPrintData(getDocumento, id);

    return (
        <div id={pdfStyles['section-to-print']}>
            <h1>RECIBO</h1>
            <p className={pdfStyles.pdfText}>
                Eu {recebe.nome_razao} {recebe.cpf_cnpj}
                , localizado em {recebe.logradouro}, {recebe.numero}
                , {recebe.complemento}, {recebe.cep}, {recebe.bairro},{' '}
                {recebe.cidade}, {recebe.estado}, declaro para os devidos fins
                que recebi de {paga.nome_razao} {paga.cpf_cnpj}
                , o valor de R$ {specificDocumentData.valor} {"("}{specificDocumentData.valorPorExtenso}{")"} em virtude de {specificDocumentData.observacao}.
            </p>
            <p className={pdfStyles.local}>{specificDocumentData.cidade}, {specificDocumentData.estado}, {specificDocumentData.date}</p>
            <div className={pdfStyles.signatureContainer}>
                <p className={pdfStyles.signature}>{recebe.nome_razao}<br/>{recebe.cpf_cnpj}</p>
            </div>
            <div className={pdfStyles.signatureContainer}>
                <p className={pdfStyles.signature}>{paga.nome_razao}<br/>{paga.cpf_cnpj}</p>
            </div>
        </div>
    );
};
