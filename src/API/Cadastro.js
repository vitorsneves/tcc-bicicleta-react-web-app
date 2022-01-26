import axios from 'axios'
import { formatPeopleResponse } from './FormatText' 

const api_url = 'https://a6e9-187-32-90-1.ngrok.io';

export const GetPeople = async () => {
    const response =  await axios({
        method: 'get',
        url: `${api_url}/parceiros`,
        responseType: 'json'
    });

    return formatPeopleResponse(response);
};

export const getParceiro = async (cpf_cnpj) => {
    const response = await axios({
        method: 'get',
        url: `${api_url}/parceiros/buscar`,
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

    if(person.tipo === "PESSOA JURIDICA") {
        dataToPost.cpF_CNPJ = person.cnpj.match( /\d+/g ).join('');
        dataToPost.nome_Razao = person.razaoSocial;
    }

    dataToPost.tipo = person.tipo;
    dataToPost.empresaID = "ade03a2a-9f87-4402-97c9-2344b839ae2c";

    await axios({
        method: 'post',
        url: `${api_url}/cadastrar`,
        data: {...dataToPost}
    });
};

export const DeletePerson = async (id) => {
    
    return await axios ({
        method: 'delete',
        url: `${api_url}/parceiros/${id}`,
        responseType: 'json'
    });
    
}