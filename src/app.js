import React, { useState } from 'react';
import AdminPage from './AdminPage/AdminPage'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavigationBar from './navigation-bar'
import Home from './home/home';
import PacheteService  from './home/PacheteService'
import Signup from './home/Signup';
import ServicePage from './home/ServicePage';
import ServiceRegister from './ServiceRegister/ServiceRegister';
import ManagerPage from './ServiceManagerPage/ManagerPage'
import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';
import Login from './Login/LoginPage'
import UnregistredService from './AdminPage/UnregistredService'
import AccountsContainer from './AdminPage/AccountsContainer'

import AdaugaPachetPromotional from './ServiceManagerPage/AdaugaPachetPromotional'
import PachetePromotionale from './ServiceManagerPage/PachetePromotionale'

class App extends React.Component {


    render() {


        return (
            <div className={styles.back}>
            <Router>
                <div>
                    <Switch>
                        <Route
                            exact
                            path='/'
                            render={() => <Home/>}
                        />
                        <Route
                                                           exact
                                                           path='/SignUp'
                                                           render={() => <Signup/>}
                                                       />
                        <Route
                              exact
                              path='/adminpage/viewAccounts'
                              render={() => <AccountsContainer/>}
                          />

                        <Route
                                                    exact
                                                    path='/servicepage'
                                                    render={() => <ServicePage/>}
                                                />
                         <Route
                                                                            exact
                                                                            path='/servicepage/pachete'
                                                                            render={() => <PacheteService />}
                                                                        />

                        <Route
                              exact
                              path='/adminpage/viewUnregistredService'
                              render={() => <UnregistredService/>}
                          />

                          <Route
                                                        exact
                                                        path='/managerpage/adaugaPachetPromotional'
                                                        render={() => <AdaugaPachetPromotional/>}
                                                    />
                         <Route
                                                         exact
                                                         path='/managerpage/pachetePromotionale'
                                                         render={() => <PachetePromotionale/>}
                                                         />

                          <Route
                                                        exact
                                                        path='/managerpage'
                                                        render={() => <ManagerPage/>}
                                                    />


                        <Route
                             exact
                              path='/adminpage'
                                render={() => <AdminPage/>}
                              />

                         <Route
                                                    exact
                                                    path='/Login'
                                                    render={() => <Login/>}
                                                />
                        <Route
                          exact
                          path='/serviceregisterform'
                          render={() => <ServiceRegister/>}
                          />


                        {/*Error*/}
                        <Route
                            exact
                            path='/error'
                            render={() => <ErrorPage/>}
                        />

                        <Route render={() =><ErrorPage/>} />
                    </Switch>
                </div>
            </Router>
            </div>
        )
    };
}

export default App
