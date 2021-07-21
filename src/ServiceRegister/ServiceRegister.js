import React from 'react';
import Button from "react-bootstrap/Button";

import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import { Form } from "react-bootstrap";
import {HOST} from "../commons/hosts";
import * as APIService from "../ServiceRegister/api/APIService"

class ServiceRegister extends React.Component {

    constructor(props) {
        super(props);

        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,
            data: "",
            isLoaded: false,
            formIsValid: false,

            formControls: {
                nume: {
                               value: '',
                               placeholder: 'Insert name for service',
                               touched: false,

                           },
                email: {
                    value: '',
                    placeholder: 'Insert your Email',
                    touched: false,

                },
               telefon: {
                                    value: '',
                                    placeholder: 'Insert your phone number for service',
                                    touched: false,

                                },

                sigla: {
                    value: null,
                    placeholder: 'Insert your logo',
                    touched: false,

                },
                acte: {
                                    value: null,
                                    placeholder: 'Insert your documents, to prove this is your auto-service',
                                    touched: false,

                                },
                adresa: {
                    value: '',
                    placeholder: 'type your address, example:Cluj-Napoca,observatorului 34',

                    touched: false,

                },
                managerAcc: {
                    value: '',
                    placeholder: 'Username to manange your service',

                    touched: false,
                },
               password: {
                    value: '',
                    placeholder: 'Password for user',

                    touched: false,
                },
            }
        };

        this.handleFileChange  = this.handleFileChange.bind(this);
         this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }





    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;

        updatedControls[name] = updatedFormElement;

        this.setState({
            formControls: updatedControls,
            formIsValid: true,
        });

    };

 handleFileChange = event => {
  const name = event.target.name;
  const value = event.target.files[0];
   const updatedControls = this.state.formControls;

          const updatedFormElement = updatedControls[name];

          updatedFormElement.value = value;

          updatedControls[name] = updatedFormElement;

          this.setState({
              formControls: updatedControls,
              formIsValid: true,
          });

 };

    handleSubmit() {




            const formdata=new FormData();
             formdata.append('nume',this.state.formControls.nume.value)
            formdata.append('email',this.state.formControls.email.value)
             formdata.append('adresa',this.state.formControls.adresa.value)
              formdata.append('telefon',this.state.formControls.telefon.value)
            formdata.append('sigla',this.state.formControls.sigla.value)
            formdata.append('acte',this.state.formControls.acte.value)
            formdata.append('username',this.state.formControls.managerAcc.value)
            formdata.append('password',this.state.formControls.password.value)


        this.insertService(formdata);
    }

 insertService(servicemodel) {
        return APIService.insertService(servicemodel,(result, status, err) => {

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

    render() {
        return (
            <div name="formserviceregister">
                <FormGroup id='nume'>
                                    <Label for='numeField'>ServiceName: </Label>
                                    <Input name='nume' id='numeField' placeholder={this.state.formControls.nume.placeholder}
                                           onChange={this.handleChange}
                                           required
                                    />
                                </FormGroup>

                <FormGroup id='email'>
                    <Label for='emailField'> Email Address: </Label>
                    <Input name='email' id='emailField' placeholder={this.state.formControls.email.placeholder}
                           onChange={this.handleChange}
                           required
                    />
                </FormGroup>

                <FormGroup id='telefon'>
                                    <Label for='telefonField'> PhoneNumber: </Label>
                                    <Input name='telefon' id='telefonField' placeholder={this.state.formControls.telefon.placeholder}
                                           onChange={this.handleChange}
                                           required
                                    />
                                </FormGroup>

                <FormGroup id='sigla'>
                                    <Label for='siglaField'>Logo: </Label>
                                    <Input type='file' name='sigla' id='siglaField'
                                           onChange={this.handleFileChange}
                                           required
                                    />
                                </FormGroup>
                <FormGroup id='acte'>
                                                    <Label for='acteField'>Service Acts, .pdf file: </Label>
                                                    <Input type='file' name='acte' id='acteField'
                                                           onChange={this.handleFileChange}
                                                           required
                                                    />
                                                </FormGroup>
                <FormGroup id='adresa'>
                                    <Label for='addressField'> Address: </Label>
                                    <Input name='adresa' id='addressField' placeholder={this.state.formControls.adresa.placeholder}
                                           onChange={this.handleChange}
                                           required
                                    />
                                </FormGroup>
                <FormGroup id='managerAcc'>
                                                    <Label for='managerAccField'>Username to manage your service account: </Label>
                                                    <Input name='managerAcc' id='managerAccField' placeholder={this.state.formControls.managerAcc.placeholder}
                                                           onChange={this.handleChange}
                                                           required
                                                    />
                </FormGroup>
                <FormGroup id='password'>
                    <Label for='passwordField'> Password: </Label>
                    <Input name='password' id='passwordField' placeholder={this.state.formControls.password.placeholder}
                           onChange={this.handleChange}
                           required
                    />
                </FormGroup>

                <Row>
                    <Col sm={{size: '4', offset: 8}}>
                        <Button type={"submit"} href='/' onClick={this.handleSubmit}> Submit </Button>
                    </Col>
                </Row>

            </div>
        ) ;
    }
}

export default ServiceRegister;
