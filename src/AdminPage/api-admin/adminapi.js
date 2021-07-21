import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";
const endpoint = {
    ing: '/admin'
};

function getService(token,callback) {
    let request = new Request(HOST.backend_api + endpoint.ing, {
       method: 'GET',
               headers : {
                'Authorization': 'Bearer ' + token.get('bearer'),
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
               },

    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function unregistredService(token,callback) {
    let request = new Request(HOST.backend_api + endpoint.ing+'/unregistredservice', {
       method: 'GET',
               headers : {
                'Authorization': 'Bearer ' + token.get('bearer'),
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
               },

    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getActe(formdata,token,callback) {
console.log("token:"+token.get('bearer'));
console.log("formdata:"+formdata.get('service'));
    let request = new Request(HOST.backend_api + endpoint.ing+'/acteService', {
       method: 'POST',
               headers : {
                'Authorization': 'Bearer ' + token.get('bearer'),
               },
               body:formdata,

    });
    console.log("request:"+request.url);
    RestApiClient.performRequest(request, callback);
}

function approve(formdata,token,callback) {
console.log("token:"+token.get('bearer'));
console.log("formdata:"+formdata.get('service'));
    let request = new Request(HOST.backend_api + endpoint.ing+'/approve', {
       method: 'POST',
               headers : {
                'Authorization': 'Bearer ' + token.get('bearer'),
               },
               body:formdata,

    });
    console.log("request:"+request.url);
    RestApiClient.performRequest(request, callback);
}

function deleteservice(formdata,token,callback) {
console.log("token:"+token.get('bearer'));
console.log("formdata:"+formdata.get('service'));
    let request = new Request(HOST.backend_api + endpoint.ing+'/delete', {
       method: 'POST',
               headers : {
                'Authorization': 'Bearer ' + token.get('bearer'),
               },
               body:formdata,

    });
    console.log("request:"+request.url);
    RestApiClient.performRequest(request, callback);
}

function getAccounts(token,callback) {


                        let request = new Request(HOST.backend_api + endpoint.ing+'/getaccounts', {
                           method: 'GET',
                                   headers : {
                                    'Authorization': 'Bearer ' + token,
                                   },


                        });
                        console.log("request:"+request.url);
                        RestApiClient.performRequest(request, callback);
                    }
 function deleteacc(id,token,callback) {

     let request = new Request(HOST.backend_api + endpoint.ing+'/deleteAccount?id='+id, {
        method: 'DELETE',
                headers : {
                 'Authorization': 'Bearer ' + token,
                },


     });
     console.log("request:"+request.url);
     RestApiClient.performRequest(request, callback);
 }

 function updateacc(account,token,callback) {

      let request = new Request(HOST.backend_api + endpoint.ing+'/updateAccount', {
         method: 'POST',
                 headers : {
                  'Authorization': 'Bearer ' + token,
                  'Accept': 'application/json',
                   'Content-Type': 'application/json',
                 },
                 body:JSON.stringify(account),

      });
      console.log("request:"+request.url);
      RestApiClient.performRequest(request, callback);
  }

  function getaccbyid(id,token,callback) {

        let request = new Request(HOST.backend_api + endpoint.ing+'/getAccount?id='+id, {
           method: 'GET',
                   headers : {
                    'Authorization': 'Bearer ' + token,

                   },


        });
        console.log("request:"+request.url);
        RestApiClient.performRequest(request, callback);
    }


export {
   getService,
   getActe,
   deleteservice,
   approve,
   unregistredService,
   getAccounts,
   getaccbyid,
   deleteacc,
   updateacc,
};
