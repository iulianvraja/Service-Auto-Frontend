import React from 'react'
import logo from './commons/images/logoApp.jpg';

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

const NavigationBarLogin = () => (
    <div>
        <Navbar color="dark" light expand="md">
            <NavbarBrand href="/">
                <img src={logo} width={"100px"}
                     height={"25"} />
            </NavbarBrand>
            <Nav className="mr-auto" navbar>

                            <DropdownMenu>
                            <NavLink href="/logasUser">Doctor Login</NavLink>


                            <NavLink href="/logasAdministrator">Ingrijitor Login</NavLink>



                            <NavLink href="/logaspacient">Pacient Login</NavLink>
                            <DropdownMenu/>



            </Nav>
        </Navbar>
    </div>
);

export default NavigationBarLogin
