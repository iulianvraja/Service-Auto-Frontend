import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as API_USERS from "../Login/api/apiLogin"
import jwt_decode from "jwt-decode";
import { Redirect } from 'react-router-dom';
import { useNavigate } from "@reach/router"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


class Login extends React.Component {

constructor(props) {
    super(props);

    this.state = {
    roleafterLogin:'',
    logged:false,

        formControls: {
                username: {
                               value: '',
                               placeholder: 'Insert your username',
                               touched: false,

                           },
                password: {
                    value: '',
                    touched: false,

                },
    }
  };
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
    this.reload=this.reload.bind(this);

  }



registerUser(user) {
       return(API_USERS.postLogin(user, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("get bearer" + result.token);
                localStorage.setItem('bearer',result.token);
                var decoded = jwt_decode(result.token);
                console.log("Auth="+decoded.roles.authority);
                this.state.roleafterLogin=decoded.roles.authority;
                this.state.logged=true;
                this.reload();

            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        }));
    }


    handleSubmit() {
        let ing = {
            username: this.state.formControls.username.value,
            password: this.state.formControls.password.value,

        };

        console.log("date trimise:username    "+ ing.username);
        this.registerUser(ing);
        this.reload();


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

    reload(){
        console.log("login state:"+ this.state.logged);
        if(this.state.logged==true)
                 window.location.reload();

        }
render() {
console.log('bearererere:'+localStorage.getItem('bearer'))
 if (localStorage.getItem('bearer') != null){

 var decoded = jwt_decode(localStorage.getItem('bearer'));
 console.log('autoritate='+decoded.roles.authority)
  if(decoded.roles.authority=='ADMIN')
  return (
           <Redirect to='/adminpage' />
             );
   if(decoded.roles.authority=='MANAGER')
    return (
              <Redirect to='/managerpage' />
                );
   if(decoded.roles.authority=='USER')
       return (
                 <Redirect to='/' />
                   );

  }
  else{
  return (
<div>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div styles={useStyles }>
        <Avatar styles={useStyles }>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form styles={useStyles } noValidate>
          <TextField
           onChange={this.handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
           onChange={this.handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
           //type="submit"
            fullWidth
            variant="contained"
            color="primary"
            styles={useStyles.submit}
            onClick={this.handleSubmit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/createaccount" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </div>
  );}
}
}
export default Login;
