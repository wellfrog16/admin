import axios from '../../../helper/axios';

const base = '/config/dictionary';

const insert = params => { return axios.post(`${base}`, params).then(res => res.data); };
const list = params => { return axios.get(`${base}`, { params }).then(res => res.data); };

export default {
    insert,
    list
};
