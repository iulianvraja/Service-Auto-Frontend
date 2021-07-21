import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";
const endpoint = {
    ruta: '/login'
};
function postLogin(user, callback){
    let request = new Request(HOST.backend_api + endpoint.ruta , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}
export{
postLogin
};