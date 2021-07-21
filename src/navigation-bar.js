import React from 'react'
import { Redirect } from 'react-router-dom';
import logo from './commons/images/logoApp.jpg';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import jwt_decode from "jwt-decode";
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavLink,
    UncontrolledDropdown
} from 'reactstrap';

const textStyle = {
    color: 'white',
    textDecoration: 'none'
};
const f=()=>{
localStorage.clear();

}

function defineNavbar1(){
if(typeof localStorage.getItem('bearer')!== "undefined" && localStorage.getItem("bearer") !== null){
 var decoded = jwt_decode(localStorage.getItem('bearer'));
            if(decoded.roles.authority=='USER')
    return(<div className="App">
                   <Navbar color="dark" light expand="md">
                       <NavbarBrand href="/">
                           <img src={logo} width={"100px"}
                                height={"20px"} />
                       </NavbarBrand>
                       <Nav className="mr-auto" navbar>
                           <NavLink href="/serviceregisterform">Inregistreaza Service</NavLink>
                              <NavLink onClick={f} position='right' href="/">Logout</NavLink>
                       </Nav>
                   </Navbar>
               </div>)
               }

            return(<div className="App">
                               <Navbar color="dark" light expand="md">
                                   <NavbarBrand href="/">
                                       <img src={logo} width={"100px"}
                                            height={"20px"} />
                                   </NavbarBrand>
                                   <Nav className="mr-auto" navbar>
                                       <NavLink href="/serviceregisterform">Inregistreaza Service</NavLink>
                                        <NavLink href="/Login">Login</NavLink>
                                         <NavLink href="/SignUp">Creeare Cont</NavLink>
                                   </Nav>
                               </Navbar>
                           </div>)

    }




const NavigationBar = defineNavbar1

export default NavigationBar
