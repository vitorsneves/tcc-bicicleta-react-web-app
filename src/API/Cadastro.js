import axios from 'axios'
import { formatPeopleResponse } from './FormatText' 

export const GetPeople = async () => {
    const response =  await axios({
        method: 'get',
        url: 'https://9dcc-187-32-90-1.ngrok.io/parceiros',
        responseType: 'json'
    });

    return formatPeopleResponse(response);
};

export const getParceiro = async (cpf_cnpj) => {
    console.log(`fetching parceiro with cpf_cnpj ${cpf_cnpj}`)

    const response = await axios({
        method: 'get',
        url: "https://9dcc-187-32-90-1.ngrok.io/parceiros/buscar",
        params: {
            filtro: cpf_cnpj.match( /\d+/g ).join('')
        },
        responseType: 'json'
    });

    return formatPeopleResponse(response).data[0];
}

export const PostParceiro = async (person) => {
    const dataToPost = {
        cep: person.cep.match( /\d+/g ).join(''),
        logradouro: person.logradouro,
        numero: person.numero,
        complemento: person.complemento,
        bairro: person.bairro,
        cidade: person.cidade,
        estado: person.estado,
        telCelular: person.telefoneCelular.match( /\d+/g ).join(''),
        telFixo: person.telefoneFixo.match( /\d+/g ).join(''),
        email: person.email,
    }

    if(person.tipo === "PESSOA FISICA") {
        dataToPost.cpF_CNPJ = person.cpf.match( /\d+/g ).join('');
        dataToPost.nome_Razao = person.nome;
    }

    if(person.tipoe === "PESSOA JURIDICA") {
        dataToPost.cpF_CNPJ = person.cnpj.match( /\d+/g ).join('');
        dataToPost.nome_Razao = person.razaoSocial;
    }

    dataToPost.tipo = person.tipo;
    dataToPost.empresaID = "ade03a2a-9f87-4402-97c9-2344b839ae2c";

    console.log(dataToPost);

    await axios({
        method: 'post',
        url: 'https://9dcc-187-32-90-1.ngrok.io/cadastrar',
        data: {...dataToPost}
    });
};

export const DeletePerson = async (id, person) => {
    const response = null;
    
    if(person[0].tipo === 'fisica') {
        response = await axios ({
            method: 'delete',
            url: `http://localhost:5000/pessoasFisicas/${id}`,
            responseType: 'json'
        });
    }
    
    if(person[0].tipo === 'juridica') {
        response = await axios ({
            method: 'delete',
            url: `http://localhost:5000/pessoasJuridicas/${id}`,
            responseType: 'json'
        });
    }

    console.log(response);
}
