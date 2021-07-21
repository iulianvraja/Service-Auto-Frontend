import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";
const endpoint = {
    ing: '/'
};

function getService(callback) {
    let request = new Request(HOST.backend_api + endpoint.ing, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function getPachete(id,callback) {
    let request = new Request(HOST.backend_api + endpoint.ing+'pachete?serviceid='+id, {
       method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function signup(user, callback){
    let request = new Request(HOST.backend_api + '/login/signup' , {
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

function getOferte(id,callback) {

                            let request = new Request(HOST.backend_api + endpoint.ing+'oferte?serviceid='+id, {
                               method: 'GET',

                            });
                            console.log("request:"+request.url);
                            RestApiClient.performRequest(request, callback);
                        }

function getserviceRating(id,callback) {

                            let request = new Request(HOST.backend_api + endpoint.ing+'rating?serviceid='+id, {
                               method: 'GET',

                            });
                            console.log("request:"+request.url);
                            RestApiClient.performRequest(request, callback);
                        }

function getReviews(id,callback) {

                            let request = new Request(HOST.backend_api + endpoint.ing+'getreviews?serviceid='+id, {
                               method: 'GET',

                            });
                            console.log("request:"+request.url);
                            RestApiClient.performRequest(request, callback);
                        }
function addReview(review,token,serviceid,callback){
//console.log(JSON.stringify(review))
 let request = new Request(HOST.backend_api +'/lasareview?bearer='+token+'&serviceid='+serviceid, {
       method: 'POST',
               headers : {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
               },
               body:JSON.stringify(review),

    });
    console.log("request="+request.url)
     RestApiClient.performRequest(request, callback);
}

function getStringOferte(callback) {

                            let request = new Request(HOST.backend_api +'/oferteString', {
                               method: 'GET',

                            });
                            console.log("request:"+request.url);
                            RestApiClient.performRequest(request, callback);
                        }
function bestPrice(oferte,callback) {
                            console.log(JSON.stringify(oferte));
                            let request = new Request(HOST.backend_api +'/bestprice', {
                                   method: 'POST',
                                           headers : {

                                            'Content-Type': 'application/json',
                                           },
                                           body:JSON.stringify(oferte),

                                });
                            console.log("request:"+request.url);
                            RestApiClient.performRequest(request, callback);
                        }
export {
   getService,
   getOferte,
   getPachete,
   signup,
   getReviews,
   addReview,
   getserviceRating,
   getStringOferte,
   bestPrice,
};