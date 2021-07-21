
import React from 'react';
//import Login from '../Login/LoginPage'
import {Button, Container, Jumbotron} from 'reactstrap';

import ReactTable from 'react-table';
import Select from 'react-select'
import StarRatings from 'react-star-ratings';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {
    Card,
    CardHeader,
    Col, FormGroup, Input, Label,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';
import ReactPaginate from 'react-paginate';
import * as API_Service from "./api/home-api"
import {Form} from "react-bootstrap";
import {HOST} from "../commons/hosts";
import NavigationBar from '../navigation-bar'
const backgroundStyle = {

      backgroundColor: 'blue',
      backgroundSize: 'cover',
      padding: "80px",
      width: "80%",
      height: "755px",
      border: "2px solid",
      color: "pink",
};
const filters = [
    {
        accessor: 'reparatii',
    }
];


     const footer_box={
         overflow: "auto",
         borderTop:"2px solid #009933",
         backgroundColor:"blue"
     }
     const PER_PAGE=2;
     const columns =[
                               {
                                   Header: 'Tip',
                                   accessor: 'type',
                               },
                               {
                                   Header: 'Reparatii',
                                   accessor: 'reparatii',
                               },
                               {
                                                       Header: 'Pret',
                                                      accessor: 'pret',
                                                   },
                               {
                                   Header: 'Service-ul',
                                   accessor: 'servicename',
                               },

                               {
                                   Header:'Telefon',
                                   accessor:'telefon',
                                 },

                           ];
class Home extends React.Component {

 constructor(props) {
        super(props);
        this.reload = this.reload.bind(this);
        this.state = {
            data: [],
            service_perpage:[],
            pageCount:0,
            offset:0,
            isLoaded: false,
            errorStatus: 0,
            error: null,
            ofertesearch:[],
            reparatii_user:[],
            searchOnChange:'',
            raspunsAlgoritm:[],
            algisLoaded:0,

        };
  this.handlevizualizeaza=this.handlevizualizeaza.bind(this);
 this.handlePageClick=this.handlePageClick.bind(this);
 this.handleChange2=this.handleChange2.bind(this);
 this.adauagaofertasearch=this.adauagaofertasearch.bind(this);
 this.algoritmBestPrice=this.algoritmBestPrice.bind(this);
    }

    reload() {
            this.setState({
                isLoaded: false,
                data:[]
            });
            this.fetchService();
        }


componentDidMount() {
        this.fetchService();
        this.fetchoff();

    }

handleChange2(variabila){
        console.log("valoare search:"+variabila.value)
         this.state.searchOnChange=variabila.value;
        }
 handlevizualizeaza(id){
localStorage.setItem('serviceid',id);
 }

 adauagaofertasearch(){
 let arr=this.state.reparatii_user;
 arr.push(this.state.searchOnChange);
this.setState({reparatii_user:arr});
 }

 fetchService() {

        return API_Service.getService((result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    data: result,
                    pageCount : Math.ceil(result.length / PER_PAGE),
                    service_perpage: result.slice(this.state.offset, this.state.offset + PER_PAGE),
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
        fetchoff(){

        return API_Service.getStringOferte((result, status, err) => {

                    if (result !== null && status === 200) {
                    let rezultat=[]
                                  rezultat=result.map(x => ({value:x+'',label: x+''}));
                        this.setState({
                           ofertesearch:rezultat,
                           isLoaded:true,
                        });
                    } else {
                        this.setState(({
                            errorStatus: status,
                            error: err
                        }));
                    }
                });
        }

  algoritmBestPrice(){

API_Service.bestPrice(this.state.reparatii_user,(result, status, err) => {

                    if (result !== null && status === 200) {
                    console.log("result:"+result);
                        this.setState({
                            reparatii_user:[],
                           raspunsAlgoritm:result,
                          algisLoaded:this.state.algisLoaded+1,
                        });
                    } else {
                        this.setState(({
                            errorStatus: status,
                            error: err
                        }));
                    }
                });
  }
handlePageClick({ selected: selectedPage }){
console.log("selected_page:"+selectedPage);
let pag=selectedPage*PER_PAGE;

let dataperpage=this.state.data.slice(pag,pag+PER_PAGE);
 this.setState({
            service_perpage: dataperpage,
            isLoaded:true,
        });
}

    render() {
    let st=this.state.raspunsAlgoritm;
    console.log("RaspunsAlgoritm:"+st+" dasda "+ this.state.raspunsAlgoritm);



        return (

        <div>
        <NavigationBar/>
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
            {this.state.service_perpage.map((d) =>
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
                          <Button onClick={()=>this.handlevizualizeaza(d.service_id)} href="/servicepage"> Vizualizeaza Service</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                )}
               </div>
               <div>
                <p></p>
                 <p>Cautati cel mai bun pret pentru reparatiile care doriti sa le efectuati</p>
                 <Select name="search" display= "inline-block" onChange={value=>this.handleChange2(value)} width="50px" options={this.state.ofertesearch} />
                        <Button onClick={this.adauagaofertasearch}>Vreau aceasta oferta</Button>
                        <p>Ofertele Dumneavoastra</p>
                        <div id="" style={{overflow:"scroll",height:"200px"}}>
                        {this.state.reparatii_user.map((d) =><p>{d}</p>)}
                        </div>
                        <Button onClick={this.algoritmBestPrice}>Cauta cel mai bun pret pentru aceste oferte</Button>
                       </div>
                                    <ReactTable
                                               data={this.state.raspunsAlgoritm}
                                               resolveData={data => data.map(row => row)}
                                               columns={columns}
                                               defaultPageSize="4"

                                               showPagination={true}
                                               style={{
                                                   height: '300px',
                                               }}
                                           />

                 </div>


        )
    };
}


export default Home
