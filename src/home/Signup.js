import React from 'react'
import Form from "react-bootstrap/Form";

import * as API_USERS from "./api/home-api"
import jwt_decode from "jwt-decode";
import {Button} from 'reactstrap'


class Signup extends React.Component{

constructor(props){
super(props)
this.validateForm=this.validateForm.bind(this);
this.handleSubmit=this.handleSubmit.bind(this);
this.handleChange=this.handleChange.bind(this);
this.submit=this.submit.bind(this);
this.state={
logged:false,
formIsValid:false,
submited:false,
formControls:{
              username: {
                        value: '',
                        placeholder: 'Insert your username',
                        touched: false,

                           },
                password: {
                    value: '',
                    touched: false,
                },

confirmPassword:{
                  value: '',
                   touched: false,
                                },
}
}
}




 handleSubmit() {
        let ing = {
            username: this.state.formControls.username.value,
            password: this.state.formControls.password.value,

        };

        console.log("date trimise:username    "+ ing.username);
        this.submit(ing);

    }

   submit(user) {
   console.log('validateForm '+this.validateForm())
        if(this.validateForm())
          return(API_USERS.signup(user, (result, status, error) => {
               if(status === 200 || status === 201) {

                   this.setState(({
                          submited: true,
                                      }));

               } else {
                   this.setState(({

                       errorStatus: status,
                       error: error
                   }));

               }
           }));
          else
          this.setState(({

                                formIsValid:false,
                             }));
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

        });

    };

validateForm() {
    return (
      this.state.formControls.username.value.length > 3 &&
   this.state.formControls.password.value.length > 3 &&
      this.state.formControls.password.value === this.state.formControls.confirmPassword.value
    );
  }

render(){
console.log("valoare :"+this.state.submited);
if(this.state.submited){
         return(
         <div>
         <p>Cont inregistrat cu succes</p>
                 <Button href='/'>Mergeti pe pagina principala unde puteti efectua login p</Button>
         </div>);
         }
else
 return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="username" size="lg">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            name="username"

            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="password" size="lg">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"

            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" size="lg">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            onChange={this.handleChange}

          />
        </Form.Group>
        <Button
        onClick={this.handleSubmit}
        >
          Creeare Cont
        </Button>

      </Form>

    );
}
}
export default Signup;