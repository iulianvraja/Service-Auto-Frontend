import React from 'react';
import * as API_Service from "./api/home-api";
import ReactPaginate from 'react-paginate';
import CommentBox from './CommentBox';

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

    Modal,
    ModalBody,
    ModalHeader,


} from 'reactstrap';
import {
    Button,

    NavLink

} from 'reactstrap';
const PER_PAGE=4;

class ServicePage extends React.Component{

constructor(props){
super(props)
this.state={        showcomments:false,
                    serviceid:localStorage.getItem('serviceid'),
                    data: [],
                    isLoaded: false,
                    errorStatus: 0,
                    error: null,
                    selected:false,
                    offset:0,
                    pageCount:0,
                    currentPageData:[],
                    options:[],
}
this.toggleForm=this.toggleForm.bind(this);
this.handlePageClick=this.handlePageClick.bind(this);
}
componentDidMount(){
this.fetchOferte()
}

toggleForm() {
         console.log("toggleeeeeeeeeeeee");
        this.setState({showcomments: !this.state.showcomments});
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

fetchOferte() {




          return API_Service.getOferte(this.state.serviceid,(result, status, err) => {

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

render(){

return(
<div>
 <div
                           style={{display: 'flex', height: '100vh', overflow: 'scroll initial' }}
                         >
                           <CDBSidebar textColor="#fff" backgroundColor="#333">
                             <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                               <a
                                 href="/"
                                 className="text-decoration-none"
                                 style={{ color: 'inherit' }}
                               >
                                 HomePage
                               </a>
                             </CDBSidebarHeader>

                             <CDBSidebarContent className="sidebar-content">
                               <CDBSidebarMenu>
                                 <NavLink exact to="/servicepage" activeClassName="activeClicked">
                                   <CDBSidebarMenuItem icon="columns">Oferte</CDBSidebarMenuItem>
                                 </NavLink>
                                 <NavLink exact to="/servicepage/pachete"  href="/servicepage/pachete" activeClassName="activeClicked">
                                   <CDBSidebarMenuItem icon="table">PachetePromotionale</CDBSidebarMenuItem>
                                 </NavLink>
                                  <NavLink exact to="" activeClassName="activeClicked">
                                    <CDBSidebarMenuItem onClick={this.toggleForm} icon="user">Reviews</CDBSidebarMenuItem>
                                   </NavLink>

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

                                                </div>
                                          </div>
)
}
</div>

</div>
 <Modal width='100%' weight='100%' isOpen={this.state.showcomments} toggle={this.toggleForm}
                                     className={this.props.className} size="lg">
                                  <ModalHeader toggle={this.toggleForm}>Reviews Clienti: </ModalHeader>
                                   <ModalBody weight="80%">
                                   <CommentBox reloadHandler={this.reload}/>
                                     </ModalBody>
                                     </Modal>

</div>
);

}

}
export default ServicePage;