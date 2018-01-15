import Vue from 'vue';
import Vuex from 'vuex';
// import * as actions from './actions'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        pagesize: 10,
        uploadUrl: 'http://localhost:8001/service/file/upload'
    }
    // actions,
    // modules: {
    //     cart,
    //     products
    // }
});
