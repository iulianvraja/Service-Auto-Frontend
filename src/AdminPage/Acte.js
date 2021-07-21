import * as API_Service from "../AdminPage/api-admin/adminapi"
import React from 'react';

import { Document, Page, Text, View, StyleSheet,PDFViewer} from '@react-pdf/renderer';
import PDF from 'react-pdf-js';
import {
    Button} from 'reactstrap';

class Acte extends React.Component {

 constructor(props) {
   super(props);
                    this.state = {
                                  blob:null,
                                 pdfload:false,
                                 pdf:[],
                                 data: [],
                                 isLoaded: false,
                                 errorStatus: 0,
                                 error: null,
                                 selected:false,

                             };
     }



componentDidMount() {

        this.getActe(localStorage.getItem('serviceId'));
    }

 getActe(id){
console.log("id service:"+id)
     const formdata=new FormData();

                   formdata.append('service',id)
     const token=new FormData();
     token.append('bearer',localStorage.bearer)

              return API_Service.getActe(formdata,token,(result, status, err) => {

                  if (result !== null && status === 200) {
                      this.setState({
                          pdf: result,


                      });
                  } else {
                      this.setState(({
                          errorStatus: status,
                          error: err
                      }));
                  }
              });
              const raw = window.atob(`data:application/pdf;base64,${this.state.pdf}`);
              const rawLength = raw.length;
              const blobArray = new Uint8Array(new ArrayBuffer(rawLength));

              for (let i = 0; i < rawLength; i++) {
                  blobArray[i] = raw.charCodeAt(i);
              }

              this.state.blob = new Blob([blobArray], {type: 'application/pdf'});
              }

 render(){
 if(this.state.errorStatus===403){
          return(
          <div>
          <p>Eroare, nu ati efectuat logarea:{this.state.errorStatus} FORBIDDEN</p>
                  <Button href='/'>Du-te pe pagina principala</Button>
          </div>);
          }
          else
 return(

<div width='100%' height='500px'>
  <object  width='100%' height='500px' data={"data:application/pdf;base64,"+this.state.pdf} type='application/pdf'></object>
  </div>
       //file={`data:application/pdf;base64,${this.state.pdf}`}

 );
 }
 }
export default Acte;