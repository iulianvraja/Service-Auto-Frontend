import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";
const endpoint = {
    service: '/serviceregister'
};

function insertService(service,callback){
    let request = new Request(HOST.backend_api + endpoint.service, {
        method: 'POST',
       body:service,
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function allService(callback) {
    let request = new Request(HOST.backend_api + '/admin/view', {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    insertService,
    allService
};