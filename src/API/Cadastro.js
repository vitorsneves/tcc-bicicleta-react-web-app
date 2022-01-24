import axios from 'axios'

export const GetPeople = async () => {
    const fisicas = await axios({
        method: 'get',
        url: 'http://localhost:5000/pessoasFisicas',
        responseType: 'json'
    });

    const juridicas = await axios({
        method: 'get',
        url: 'http://localhost:5000/pessoasJuridicas',
        responseType: 'json'
    });

    let response = [];

    fisicas.data.forEach((pessoaFisica) => {
        let cadastro = {};

        cadastro.id = pessoaFisica.id;
        cadastro.cpf_cnpj = pessoaFisica.cpf;
        cadastro.nome_razao = pessoaFisica.nome;
        cadastro.cidade = pessoaFisica.cidade;
        cadastro.estado = pessoaFisica.estado;
        cadastro.bairro = pessoaFisica.bairro;
        cadastro.logradouro = pessoaFisica.logradouro;
        cadastro.numero = pessoaFisica.numero;
        cadastro.tipo = 'fisica';
    
        response.push(cadastro);
    });
    
    juridicas.data.forEach((pessoaJuridica) => {
        let cadastro = {};
        
        cadastro.id = pessoaJuridica.id;
        cadastro.cpf_cnpj = pessoaJuridica.cnpj;
        cadastro.nome_razao = pessoaJuridica.razaoSocial;
        cadastro.cidade = pessoaJuridica.cidade;
        cadastro.estado = pessoaJuridica.estado;
        cadastro.bairro = pessoaJuridica.bairro;
        cadastro.logradouro = pessoaJuridica.logradouro;
        cadastro.numero = pessoaJuridica.numero;
        cadastro.tipo = 'juridica';
        
        response.push(cadastro);
    });
    
    return response;
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


export const PostPessoaFisica = async (pessoaFisica) => {
    await axios({
        method: 'post',
        url: 'http://localhost:5000/pessoasFisicas',
        data: {...pessoaFisica}
    });
};

export const PostPessoaJuridica = async (pessoaJuridica) => {
    await axios({
        method: 'post',
        url: 'http://localhost:5000/pessoasJuridicas',
        data: {...pessoaJuridica}
    })
}

export const getPessoaFisicaById = async (id) => {
    console.log(`pessoa com id ${id}`);
    return await axios({
        method: 'get',
        url: `http://localhost:5000/pessoasFisicas/${id}`,
        responseType: 'json'
    });
}

export const getPessoaJuridicaById = async (id) => {

    console.log(`pessoa com id ${id}`);
    return await axios({
        method: 'get',
        url: `http://localhost:5000/pessoasJuridicas/${id}`,
        responseType: 'json'
    });
}

export const getPessoa = async (id, tipo) => {
    console.log(`Buscando por pessoa ${tipo} com id ${id}`);

    if(tipo === 'fisica') {
        const result = await getPessoaFisicaById(id);
        return result;
    }

    if(tipo === 'juridica') {
        const result = await getPessoaJuridicaById(id);
        return result;
    }
}