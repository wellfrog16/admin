import axios from '@/helper/axios';

const base = '/database/database';

const list = params => axios.get(`${base}`, { params }).then(res => res.data);

export default {
    list
};
