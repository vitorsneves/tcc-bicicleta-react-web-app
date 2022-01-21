import axios from 'axios'

export const GetPeople = async () => {
    const response = await axios({
        method: 'get',
        url: 'http://localhost:5000/cadastros',
        responseType: 'json'
      })
      return response.data
};

export const DeletePerson = () => {};

export const UpdatePerson = () => {};

export const PostPerson = () => {};