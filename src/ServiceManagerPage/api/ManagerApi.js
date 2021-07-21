import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";
const endpoint = {
    ing: '/servicemanager'
};

function getoferte(token,callback) {
    let request = new Request(HOST.backend_api + endpoint.ing+'/oferte'+'?bearer='+token, {
       method: 'GET',
               headers : {
                'Authorization': 'Bearer ' + token,
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
               },

    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function insertOferta(oferta,token,callback){
console.log("ce oferta trimitem?")
console.log(JSON.stringify(oferta))

    let request = new Request(HOST.backend_api + endpoint.ing+'/addoferta'+'?bearer='+token, {
        method: 'POST',
        headers : {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',
                       },
       body:JSON.stringify(oferta)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function insertPachet(pachet,token,callback){

    let request = new Request(HOST.backend_api + endpoint.ing+'/adaugaPachetPromotional'+'?bearer='+token, {
        method: 'POST',
        headers : {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',
                       },
       body:JSON.stringify(pachet)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function deleteoferta(id,token,callback) {

    let request = new Request(HOST.backend_api + endpoint.ing+'/deleteoferta'+'?bearer='+token, {
       method: 'POST',
               headers : {
                'Authorization': 'Bearer ' + token,
               },
               body:id,

    });
    console.log("request:"+request.url);
    RestApiClient.performRequest(request, callback);
}
function getOferteString(token,callback) {

                            let request = new Request(HOST.backend_api + endpoint.ing+'/getOferteString', {
                               method: 'GET',
                                       headers : {
                                        'Authorization': 'Bearer ' + token,
                                       },
                            });
                            console.log("request:"+request.url);
                            RestApiClient.performRequest(request, callback);
                        }
function getOferteStringByService(token,callback) {

                            let request = new Request(HOST.backend_api + endpoint.ing+'/oferteserviceString?bearer='+token, {
                               method: 'GET',
                                       headers : {
                                        'Authorization': 'Bearer ' + token,
                                       },
                            });
                            console.log("request:"+request.url);
                            RestApiClient.performRequest(request, callback);
                        }

function updateoferta(formdata,token,callback) {
console.log("token:"+token.get('bearer'));
console.log("formdata:"+formdata.get('service'));
    let request = new Request(HOST.backend_api + endpoint.ing+'/updateoferta'+token, {
       method: 'POST',
               headers : {
                'Authorization': 'Bearer ' + token.get('bearer'),
               },
               body:formdata,

    });
    console.log("request:"+request.url);
    RestApiClient.performRequest(request, callback);
}

function getOfertaByName(nume_oferta,token,callback) {

    let request = new Request(HOST.backend_api + endpoint.ing+'/getofertaByName'+'?bearer='+token, {
       method: 'POST',
               headers : {
                'Authorization': 'Bearer ' + token,
               },
               body:nume_oferta,

    });
    console.log("request:"+request.url);
    RestApiClient.performRequest(request, callback);
}

function getPachete(token,callback) {
    let request = new Request(HOST.backend_api + endpoint.ing+'/pachete'+'?bearer='+token, {
       method: 'GET',
               headers : {
                'Authorization': 'Bearer ' + token,
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
               },

    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function deletepachet(id,token,callback) {

    let request = new Request(HOST.backend_api + endpoint.ing+'/deletepachet'+'?bearer='+token, {
       method: 'POST',
               headers : {
                'Authorization': 'Bearer ' + token,
               },
               body:id,

    });
    console.log("request:"+request.url);
    RestApiClient.performRequest(request, callback);
}

export {
getoferte,
insertOferta,
updateoferta,
deleteoferta,
getOferteString,
getOfertaByName,
insertPachet,
getPachete,
deletepachet,
getOferteStringByService,
}