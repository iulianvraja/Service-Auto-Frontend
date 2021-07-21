import React from 'react';
import * as API_Service from "../AdminPage/api-admin/adminapi"
import Acte from '../AdminPage/Acte'
import logo from '../commons/images/logoApp.jpg';
import {
    DropdownItem,
    DropdownMenu,
    Nav,
    Navbar,
    NavbarBrand,
    NavLink,

} from 'reactstrap';
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
const f=()=>{
localStorage.clear();

}

class UnregistredService extends React.Component {

 constructor(props) {
        super(props);
        this.reload = this.reload.bind(this);
         this.toggleForm = this.toggleForm.bind(this);



        this.state = {
            pdfload:false,
            pdf:[],
            data: [],
            isLoaded: false,
            errorStatus: 0,
            error: null,
            selected:false,

        };

    }
toggleForm(service_id) {
localStorage.setItem('serviceId',service_id);
        this.setState({selected: !this.state.selected});
    }




componentDidMount() {
        this.fetchService();
    }

aprobaservice(id){
console.log("id service:"+id)
     const formdata=new FormData();

                   formdata.append('service',id)
     const token=new FormData();
     token.append('bearer',localStorage.bearer)

              API_Service.approve(formdata,token,(result, status, err) => {

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


}

deleteServ(id){
console.log("id service:"+id)
     const formdata=new FormData();

                   formdata.append('service',id)
     const token=new FormData();
     token.append('bearer',localStorage.bearer)

              return API_Service.deleteservice(formdata,token,(result, status, err) => {

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
              this.reload2();

}


  fetchService() {

               const formdata=new FormData();
               formdata.append('bearer',localStorage.bearer);

          return API_Service.unregistredService(formdata,(result, status, err) => {

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

reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();


    }
reload2() {
        this.setState({
            isLoaded: false
        });



    }
 refreshPage(){
         window.location.reload();
      }




  render() {
  if(this.state.errorStatus===403){
           return(
           <div>
           <p>Eroare, nu ati efectuat logarea:{this.state.errorStatus} FORBIDDEN</p>
                   <Button href='/'>Du-te pe pagina principala</Button>
           </div>);
           }
           else
         return (

            <div>
                               <Navbar color="dark" light expand="md">
                                  <NavbarBrand href="/adminpage">
                                      <img src={logo} width="100px"
                                           height="20px" />
                                  </NavbarBrand>
                                  <Nav className="mr-auto" navbar>


                                      <NavLink href="/adminpage/viewUnregistredService">View Unregistred Service</NavLink>
                                      <NavLink href="/adminpage/viewAccounts">View Accounts</NavLink>
                                      <NavLink onClick={f} position='right' href="/">Logout</NavLink>

                                  </Nav>
                              </Navbar>
             {this.state.data.map((d) =>

             <div className=" column is-half">
                   <div className="box">
                     <div className="media">
                       <div className="media-left">
                         <figure className="image is-64x64">
                          <img src={`data:image/jpeg;base64,${d.sigla}`}
                                             width="64"
                                             height="64"/>
                         </figure>
                       </div>
                       <div className="media-content">
                         <b style={{ textTransform: "capitalize" }}>
                           {d.nume}{" "}
                           <span className="tag is-primary">Rating:{d.rating}</span>
                         </b>
                         <div>
                          <p>Email:{d.email}</p>
                         <p>Telefon:{d.telefon}</p>
                         <p>Adresa:{d.adresa}</p>
                         </div>

                         <div className="is-clearfix">
                            <Button color="primary" onClick={()=>this.toggleForm(d.service_id)}>VizualizeazaActe</Button>
                            <Button type="submit" color="primary" href="/adminpage/viewUnregistredService" onClick={()=>this.aprobaservice(d.service_id)} >AprobaService</Button>
                            <Button type="submit" color="primary" href="/adminpage/viewUnregistredService" onClick={()=>this.deleteServ(d.service_id)} >DeleteService</Button>
                         </div>
                       </div>
                     </div>
                   </div>

                   <Modal width='100%' weight='100%' isOpen={this.state.selected} toggle={this.toggleForm}
                                          className={this.props.className} size="lg">
                                       <ModalHeader toggle={this.toggleForm}>ActeService: </ModalHeader>
                                       <ModalBody weight="80%">
                                           <Acte reloadHandler={this.reload}/>
                                       </ModalBody>
                                   </Modal>

                 </div>

                 )}
         </div>    )
                   };
  }
 export default UnregistredService;