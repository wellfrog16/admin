import axios from '../../../helper/axios';

const base = '/config/dictionary';

const insert = params => { return axios.post(`${base}`, { params }).then(res => res.data); };

export default {
    insert
};
