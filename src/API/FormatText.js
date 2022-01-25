const formatCpf = (cpf) => {
    const formatedCpf = cpf.slice(0, 3) + '.' + cpf.slice(3, 6) +
        '.' + cpf.slice(6, 9) + '-' + cpf.slice(9);
    
    return formatedCpf;
}

const formatCep = (cep) => {
    const formatedCep = cep.slice(0, 5) + '-' + cep.slice(5);
    return formatedCep;
}

const formatCnpj = (cnpj) => {
    const formatedCnpj = cnpj.slice(0, 2) + '.' + cnpj.slice(2, 5) + '.' +
        cnpj.slice(5, 8) + '/' + cnpj.slice(8, 12) + '-' + cnpj.slice(12);
    return formatedCnpj;
}

const formatCellphoneNumber = (phoneNum) => {
    const formatedPhoneNum = '(' + phoneNum.slice(0, 2) + ') ' + phoneNum[2] + 
        ' ' + phoneNum.slice(4, 8) + '-' + phoneNum.slice(8);

    return formatedPhoneNum;
}

const formatPhoneNumber = (phoneNum) => {
    const formatedPhoneNum = '(' + phoneNum.slice(0, 2) + ') ' + 
        ' ' + phoneNum.slice(2, 6) + '-' + phoneNum.slice(6);

    return formatedPhoneNum;
}

const formatPerson = (person) => {

    person.cep = formatCep(person.cep);

    person.telCelular = formatCellphoneNumber(person.telCelular);
    person.telFixo = formatPhoneNumber(person.telFixo);

    if(person.tipo === 'PESSOA FISICA') {
        person.cpF_CNPJ = formatCpf(person.cpF_CNPJ);
    }
    if(person.tipo === 'PESSOA JURIDICA') {
        person.cpF_CNPJ = formatCnpj(person.cpF_CNPJ);
    }

    return person;
}

const formatDocument = (document) => {
    formatPerson(document);

    document.emP_Cnpj = formatCnpj(document.emP_Cnpj);
    document.emP_Fixo = formatPhoneNumber(document.emP_Fixo);
    document.emP_Celu = formatCellphoneNumber(document.emP_Celu);
    document.emP_Cep = formatCep(document.emP_Cep);

    return document;
}

// Pure function.
export const formatDocumentResponse = (documentResponse) => {
    let formatedDocumentResponse = JSON.parse(JSON.stringify(documentResponse));
    let documents = formatedDocumentResponse.data;

    documents = documents.map((document) => formatDocument(document));

    return formatedDocumentResponse;
}

// This is a pure function.
export const formatPeopleResponse = (peopleResponse) => {
    let formatedPeopleResponse = JSON.parse(JSON.stringify(peopleResponse));

    let people = formatedPeopleResponse.data;

    people = people.map((person) => formatPerson(person))

    return formatedPeopleResponse;
}