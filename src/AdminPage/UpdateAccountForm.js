import React from 'react'
import {
    Button,
    Col, FormGroup, Input, Label,
    Row
} from 'reactstrap';
import * as API_USERS from "../AdminPage/api-admin/adminapi"

class UpdateAccountForm extends React.Component{

constructor(props){
super(props)
this.state={
id:props.dataFromParent,
username:'',
password:'',
role:'',
}
this.handleChange=this.handleChange.bind(this);
this.handleSubmit=this.handleSubmit.bind(this);
}

componentDidMount(){
this.fetchAccount();
}
fetchAccount(){
console.log("id:"+this.state.id);
let token=localStorage.getItem('bearer')
API_USERS.getaccbyid(this.state.id,token,(result, status, err) => {

                                        if (result !== null && status === 200) {
                                            this.setState({
                                                username: result.username,
                                                password:result.password,
                                                role:result.role,

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
handleChange=event=>{
if(event.target.name==="username")
this.state.username=event.target.value;

if(event.target.name==="password")
this.state.password=event.target.value;

if(event.target.name==="role")
this.state.role=event.target.value;
}

handleSubmit(){
let account={"account_id":this.state.id,
            "username":this.state.username,
            "password":this.state.password,
            "role": this.state.role,
               }
               let token=localStorage.getItem('bearer');
API_USERS.updateacc(account,token,(result, status, err) => {

                                        if (status === 200 || status===201) {
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
console.log(account);
}
render(){
return (
            <div name="ingf">

                <FormGroup id='username'>
                    <Label for='usernameField'> Username: </Label>
                    <Input name='username' id='usernameField'
                           onChange={this.handleChange}
                           defaultValue={this.state.username}
                           required
                    />

                </FormGroup>
                <FormGroup id='password'>
                    <Label for='passField'> Parola: </Label>
                    <Input name='password' id='passField'
                    defaultValue={this.state.password}
                           onChange={this.handleChange}
                           required
                    />
                </FormGroup>

                <FormGroup id='role'>
                                    <Label for='roleField'> Role: </Label>
                                    <Input name='role' id='roleField'
                                           onChange={this.handleChange}
                                           defaultValue={this.state.role}
                                           required
                                    />
                 </FormGroup>

                <Row>
                    <Col sm={{size: '4', offset: 8}}>
                        <Button type={"submit"} href="/adminpage/viewAccounts" onClick={this.handleSubmit}> Submit </Button>
                    </Col>
                </Row>
</div>
);
}
}
export default UpdateAccountForm;