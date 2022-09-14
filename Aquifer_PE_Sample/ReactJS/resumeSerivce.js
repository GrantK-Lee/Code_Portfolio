import axios from 'axios';
import { API_HOST_PREFIX, onGlobalError, onGlobalSuccess } from './serviceHelpers';
import * as helper from './serviceHelpers';

const resumesApi = {
    endpoint: `${API_HOST_PREFIX}/api/resumes`,
};

const add = (payload) => {
    const config = {
        method: 'POST',
        url: `${resumesApi.endpoint}/v2`,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config);
};

const update = (payload, id) => { //Not implemented
    const config = {
        method: 'PUT',
        url: `${helper.API_HOST_PREFIX}/api/resumes/${id}`,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then((response) => {
        return {
            id: response.data.item,
            ...payload,
        };
    });
};

const getResume = (id) => {
    const config = {
        method: 'GET',
        url: `${resumesApi.endpoint}/${id}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export { add, update, getResume };
