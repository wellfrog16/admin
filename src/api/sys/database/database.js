import axios from '../../../helper/axios';

const base = '/database/database';

const list = params => { return axios.get(`${base}/list`, { params }).then(res => res.data); };

export default {
    list
};
