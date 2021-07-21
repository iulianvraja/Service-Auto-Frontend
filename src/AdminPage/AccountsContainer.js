import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {
    Button,
    Card,
    CardHeader,
    Col, FormGroup, Input, Label,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';

import AccountsTable from "./AccountsTable";
import UpdateAccountForm from "./UpdateAccountForm";
import {Form} from "react-bootstrap";
import * as API_USERS from "../AdminPage/api-admin/adminapi"





class AccountsContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);

        this.reload = this.reload.bind(this);
        this.state = {
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null,
            selected2: false,
            id:0,
        };

        this.handleChange = this.handleChange.bind(this);
        this.remove=this.remove.bind(this);


    }


    componentDidMount() {
        this.fetchAccounts();
    }

    fetchAccounts() {
    var token=localStorage.getItem('bearer')
        return API_USERS.getAccounts(token,(result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    tableData: result,
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

    toggleForm() {
        this.setState({selected: !this.state.selected});
    }
    toggleForm2() {
        this.setState({selected2: !this.state.selected2});
    }


    handleChange=event=>{
    this.state.id=event.target.value;
    console.log(this.state.id);
    }
remove(){
let token=localStorage.getItem('bearer');
API_USERS.deleteacc(this.state.id,token,(result, status, err) => {

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
this.fetchAccounts()
                                    }






    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
        this.toggleForm2();
        this.fetchIngrijitor();
    }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong> AccountsManagement </strong>
                </CardHeader>
                <Card>
                    <br/>

                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <AccountsTable tableData = {this.state.tableData}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>
                </Card>


                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> UpdateAccount </ModalHeader>
                    <ModalBody>
                        <UpdateAccountForm dataFromParent = {this.state.id} reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>
                <div id="del" >
                                    <FormGroup id='nume'>
                                        <Label for='dataField' > Sterge Contul cu id-ul: </Label>
                                        <Input name='nume' id='numeField' onChange={this.handleChange}/>
                                        <button type={"submit"} onClick={this.remove}> SubmitDelete</button>
                                    </FormGroup>
                                </div>
                 <div id="update">
                                                    <FormGroup id='nume'>
                                                        <Label for='dataField' >Modifica contul cu id-ul: </Label>
                                                        <Input name='nume' id='numeField' onChange={this.handleChange}/>
                                                        <button type={"submit"} onClick={this.toggleForm}>Update</button>
                                                    </FormGroup>
                                                </div>

               </div>


        )

    }
}


export default AccountsContainer;
