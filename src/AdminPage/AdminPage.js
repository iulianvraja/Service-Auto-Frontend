import React from 'react';
import * as API_Service from "../AdminPage/api-admin/adminapi"
import Acte from '../AdminPage/Acte'
import StarRatings from 'react-star-ratings';
import logo from '../commons/images/logoApp.jpg';
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

const f=()=>{
localStorage.clear();

}
class AdminPage extends React.Component {

 constructor(props) {
        super(props);
        this.reload = this.reload.bind(this);
         this.toggleForm = this.toggleForm.bind(this);


       // this.getActe=this.getActe.bind(this);
        this.setShowPdf=this.setShowPdf.bind(this);
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





  fetchService() {

               const formdata=new FormData();
               formdata.append('bearer',localStorage.bearer);

          return API_Service.getService(formdata,(result, status, err) => {

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
                 this.fetchService();
    }

setShowPdf(){
this.state.pdfload=false;}
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
<div>
                              <Navbar color="dark" light expand="md">
                                  <NavbarBrand href="/adminpage">
                                      <img src={logo} width="100"
                                           height={"20"} />
                                  </NavbarBrand>
                                  <Nav className="mr-auto" navbar>


                                      <NavLink href="/adminpage/viewUnregistredService">View Unregistred Service</NavLink>
                                      <NavLink href="/adminpage/viewAccounts">View Accounts</NavLink>
                                      <NavLink onClick={f} position='right' href="/">Logout</NavLink>

                                  </Nav>
                              </Navbar>
                          </div>
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
                           <span className="tag is-primary">
                            <StarRatings
                                                                       rating={d.rating}
                                                                       starRatedColor="blue"
                                                                       numberOfStars={5}
                                                                       name='rating'
                                                                     />
                           </span>
                         </b>
                         <div>
                          <p>Email:{d.email}</p>
                         <p>Telefon:{d.telefon}</p>
                         <p>Adresa:{d.adresa}</p>
                         </div>

                         <div className="is-clearfix">
                            <Button color="primary" onClick={()=>this.toggleForm(d.service_id)}>VizualizeazaActe</Button>
                            <Button color="primary" href="/adminpage" onClick={()=>this.deleteServ(d.service_id)}>StergeService</Button>

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
 export default AdminPage;