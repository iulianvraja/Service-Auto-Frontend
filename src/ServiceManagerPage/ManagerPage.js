import React from 'react';
import * as API_Manager from "../ServiceManagerPage/api/ManagerApi"
import ModalAddOferta from "../ServiceManagerPage/ModalAddOferta"
import ModalUpdateOferta from "../ServiceManagerPage/ModalUpdateOferta"
import logoOferta from '../commons/images/serviceIcon.jpg';
import {ScrollBox, ScrollAxes, FastTrack} from 'react-scroll-box'; // ES6
import ReactPaginate from 'react-paginate';

import "../styles.css"
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';


import {
    Button,
    Card,
    CardHeader,
    Col, FormGroup, Input, Label,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
    NavLink

} from 'reactstrap';

const f=()=>{
localStorage.clear();

}

const scroller ={
        margin: 'auto',
        height: '100%',
        width: '80%',
        overflow: 'auto',
      }

const PER_PAGE=4;


class ManagerPage extends React.Component {

 constructor(props) {
         super(props);
                this.reload = this.reload.bind(this);
                 this.toggleForm = this.toggleForm.bind(this);
                this.toggleForm2 = this.toggleForm2.bind(this);
                this.deleteoferta=this.deleteoferta.bind(this);
                this.handlePageClick=this.handlePageClick.bind(this);
               // this.getActe=this.getActe.bind(this);

                this.state = {
                dataFromParent:null,

                    data: [],
                    isLoaded: false,
                    errorStatus: 0,
                    error: null,
                    selected:false,
                    selected2:false,
                    offset:0,
                    pageCount:0,
                    currentPageData:[],
                    options:[],

                };

    }
toggleForm() {
         console.log("toggleeeeeeeeeeeee");
        this.setState({selected: !this.state.selected});
    }
toggleForm2(d) {
         console.log("toggleeeeeeeeeeeee");
         this.state.dataFromParent=d;
        this.setState({selected2: !this.state.selected2});
    }



componentDidMount() {
        this.fetchOferte();
    }


deleteoferta(id){
var token=localStorage.bearer;
const data=new FormData();
data.append('id',id);
 API_Manager.deleteoferta(data,token,(result, status, err) => {

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
          this.fetchOferte();

}


  fetchOferte() {


               var formdata=localStorage.bearer;

          return API_Manager.getoferte(formdata,(result, status, err) => {

              if (result !== null && status === 200) {
                  this.setState({
                      data: result,
                       pageCount : Math.ceil(result.length / PER_PAGE),
                       currentPageData : result.slice(this.state.offset, this.state.offset + PER_PAGE),
                      isLoaded: true,

                  });

              } else {
                  this.setState(({
                      errorStatus: status,
                      error: err
                  }));
              }
          });
          }
 searchChange = event =>{
 console.log("on select search:"+event.value);
 }

handlePageClick({ selected: selectedPage }){
console.log("selected_page:"+selectedPage);
let pag=selectedPage*PER_PAGE;
console.log(this.state.data);
let dataperpage=this.state.data.slice(pag,pag+PER_PAGE);
 this.setState({
            currentPageData: dataperpage
        });
}

reload() {
        this.setState({
            isLoaded: false
        });
   this.toggleForm();



    }

 render() {
if(this.state.errorStatus===403){
         return(
         <div>
         <p>Eroare, nu ati efectuat logarea sau credentialele introdu-se au expirat:{this.state.errorStatus} FORBIDDEN</p>
                 <Button onClick={f} href='/'>Du-te pe pagina principala</Button>
         </div>);
         }
         else
         return (



            <div>


           <div
                           style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}
                         >
                           <CDBSidebar textColor="#fff" backgroundColor="#333">
                             <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                               <a
                                 href="/"
                                 className="text-decoration-none"
                                 style={{ color: 'inherit' }}
                               >
                                 Manager Service
                               </a>
                             </CDBSidebarHeader>

                             <CDBSidebarContent className="sidebar-content">
                               <CDBSidebarMenu>
                                 <NavLink exact to="/managerservice/OferteService" activeClassName="activeClicked">
                                   <CDBSidebarMenuItem icon="columns">Oferte</CDBSidebarMenuItem>
                                 </NavLink>
                                 <NavLink exact to="/managerpage/pachetePromotionale" href='/managerpage/pachetePromotionale' activeClassName="activeClicked">
                                   <CDBSidebarMenuItem icon="table">PachetePromotionale</CDBSidebarMenuItem>
                                 </NavLink>
                                 <NavLink exact to="/managerservice/ReviewsService" activeClassName="activeClicked">
                                   <CDBSidebarMenuItem icon="user">Users Reviews</CDBSidebarMenuItem>
                                 </NavLink>
                                 <NavLink exact to="/managerservice/analytics" activeClassName="activeClicked">
                                   <CDBSidebarMenuItem icon="chart-line">
                                     Analytics
                                   </CDBSidebarMenuItem>
                                 </NavLink>

                                  <Button color="primary" onClick={()=>this.toggleForm()}>
                                                       AdaugaOferta
                                                        </Button>
                                  <NavLink exact to="/managerpage/adaugaPachetPromotional" href="/managerpage/adaugaPachetPromotional" activeClassName="activeClicked">
                                                                                  <CDBSidebarMenuItem icon="columns">Adauga Pachet Promotional</CDBSidebarMenuItem>
                                                                                </NavLink>

                                 <NavLink icon="cis-account-logout" onClick={f} position='right' href="/">Logout</NavLink>
                               </CDBSidebarMenu>
                             </CDBSidebarContent>

                             <CDBSidebarFooter style={{ textAlign: 'center' }}>
                               <div
                                 style={{
                                   padding: '20px 5px',
                                 }}
                               >
                                 Sidebar Footer
                               </div>
                             </CDBSidebarFooter>
                           </CDBSidebar>



<div  className="App" >
<ReactPaginate

        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={this.state.pageCount}
        onPageChange={this.handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
   {this.state.currentPageData.map((d) =>

                                          <div className={"style_box"}>
                                                <div className="box">
                                                      <p>
                                                        {d.oferta}{" "}
                                                        <span className="tag is-primary">:{d.pret} RON</span>
                                                      </p>

                                                      <p>Durata estimata:{d.durata_reparatie}</p>
                                                      <p>Nivelul Reparatiei:{d.cod_reparatie}</p>


                                                      <div className="is-clearfix">

                                                         <Button color="primary" onClick={()=>this.deleteoferta(d.oferta_id)} href='/managerpage'>StergeOferta</Button>
                                                          <Button color="primary" onClick={()=>this.toggleForm2(d)}>Updateaza Oferta</Button>

                                                      </div>

                                                </div>

                                          </div>

                                              )}


</div>

                         </div>

                 <Modal width='100%' weight='100%' isOpen={this.state.selected2} toggle={this.toggleForm2}
                                                                           className={this.props.className} size="lg">
                                                                        <ModalHeader toggle={this.toggleForm2}>Update Oferta: </ModalHeader>
                                                                        <ModalBody weight="80%">
                                                                            <ModalUpdateOferta dataFromParent = {this.state.dataFromParent} reloadHandler={this.reload}/>
                                                                        </ModalBody>
                                                                    </Modal>

                 <Modal width='100%' weight='100%' isOpen={this.state.selected} toggle={this.toggleForm}
                                                           className={this.props.className} size="lg">
                                                        <ModalHeader toggle={this.toggleForm}>Adauga Oferta: </ModalHeader>
                                                        <ModalBody weight="80%">
                                                            <ModalAddOferta reloadHandler={this.reload}/>
                                                        </ModalBody>
                                                    </Modal>
         </div>    )
                   };
  }


 export default ManagerPage;