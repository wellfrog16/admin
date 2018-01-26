import axios from '@/helper/axios';

const base = '/config/dictionary';

const insert = params => axios.post(`${base}`, params).then(res => res.data);
const update = (id, params) => axios.put(`${base}/${id}`, params).then(res => res.data);
const list = params => axios.get(`${base}`, { params }).then(res => res.data);
const del = id => axios.delete(`${base}/${id}`).then(res => res.data);
const checkName = name => axios.get(`${base}/check-name/${name}`).then(res => res.data);

export default {
    list,
    insert,
    update,
    del,
    checkName
};
