import React from 'react';
import Button from "react-bootstrap/Button";

import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import { Form } from "react-bootstrap";
import {HOST} from "../commons/hosts";
import Select from "react-dropdown-select";
import * as APIOferte from "../ServiceManagerPage/api/ManagerApi.js"

class ModalUpdateOferta extends React.Component {

    constructor(props) {
        super(props);

        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,
            data: [],
            isLoaded: false,
            formIsValid: false,
            codes:['reparatie usor de efectuat','reparatie medie de efectuat', 'reparatie grea de efectuat'],

            formControls: {

                oferta: {
                               value: this.props.dataFromParent.oferta,
                               placeholder: 'Tipul ofertei, alegeti din lista sau adaugati un nou tip de oferta!',
                               touched: false,

                           },
                pret: {
                    value: this.props.dataFromParent.pret,
                    placeholder: 'Pretul pentru acest serviciu',
                    touched: false,

                },
               cod_reparatie: {
                                    value: this.props.dataFromParent.cod_reparatie,
                                    placeholder: '',
                                    touched: false,

                                },

               durata_reparatie: {
                    value: this.props.dataFromParent.durata_reparatie,
                    placeholder: 'Estimati durata medie de lucru pentru aceasta oferta, ex: 2-3 zile lucratoare',
                    touched: false,

                },
            }
        };


         this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }





    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;
        console.log(name+" cu valoarea "+value);
        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;

        updatedControls[name] = updatedFormElement;

        this.setState({
            formControls: updatedControls,
            formIsValid: true,
        });

    };

componentDidMount() {
        this.oferteString();
    }
oferteString(){
var token=localStorage.bearer;
 return APIOferte.getOferteString(token,(result, status, err) => {

              if (result !== null && status === 200) {
                  this.setState({
                      data: result,
                      isLoaded: true
                  });
              } else {
                  this.setState(({
                      errorStatus: status,
                      error: err
                  }));
              }
          });
          }


    handleSubmit(id) {


        console.log('submitttttttttttt')

            const formdata=new FormData();
            const formdata2=new FormData();
            var oferta={
            'oferta_id':id,
            'oferta':'',
            'pret': 0,
            'cod_reparatie':"",
            'durata_reparatie':"",
            };

             oferta['oferta']=this.state.formControls.oferta.value
            oferta['pret']=this.state.formControls.pret.value
             oferta['cod_reparatie']=this.state.formControls.cod_reparatie.value
              oferta['durata_reparatie']=this.state.formControls.durata_reparatie.value


        this.insertOferta(oferta);
    };

 insertOferta(oferta) {
 var token=localStorage.bearer;
 console.log("adauga oferta "+token)
        return APIOferte.insertOferta(oferta,token,(result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({

                    isLoaded: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
        }

    render() {
        return (
            <div name="formserviceregister">
            <FormGroup id='oferta'>
           <Label for='ofertaField'>Oferta Dumneavoastra: </Label>
            <input defaultValue={this.props.dataFromParent.oferta} onChange={this.handleChange} name="oferta" type="text" list="oferts" />
             <datalist id="oferts">
              {this.state.data.map((d) =>
              <option name='oferta'>{d}</option>
               )}
            </datalist>

              </FormGroup>


                <FormGroup id='pret'>
                    <Label for='pretField'> Pretul Ofertei: </Label>
                    <Input defaultValue={this.props.dataFromParent.pret} name='pret' id='pretField' placeholder={this.state.formControls.pret.placeholder}
                           onChange={this.handleChange}
                           required
                    />
                </FormGroup>

                <FormGroup id='cod_reparatie'>
                                    <Label for='cod_reparatieField'> CodReparatie: </Label>
                                   <select defaultValue={this.props.dataFromParent.cod_reparatie} name='cod_reparatie' onChange={this.handleChange}>
                                     <option name='cod_reparatie' value="reparatie usor de efectuat">Reparatie usor de efectuat</option>
                                     <option name='cod_reparatie' value="reparatie medie de efectuat">Reparatie medie de efectuat'</option>
                                     <option name='cod_reparatie' value="reparatie greu de efectuat">Reparatie greu de efectuat</option>
                                   </select>
                                </FormGroup>

                <FormGroup id='durata_reparatie'>
                                    <Label for='durata_reparatie'>Durata Medie, estimata in zile: </Label>
                                    <Input defaultValue={this.props.dataFromParent.durata_reparatie} name='durata_reparatie' id='durata_reparatie'
                                           onChange={this.handleChange}
                                           required
                                    />
                                </FormGroup>


                <Row>
                    <Col sm={{size: '4', offset: 8}}>
                        <Button onClick={()=>this.handleSubmit(this.props.dataFromParent.oferta_id)} href="/managerpage"> Submit </Button>
                    </Col>
                </Row>

            </div>
        ) ;
    }
}

export default ModalUpdateOferta;

