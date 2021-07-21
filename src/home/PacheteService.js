import React from 'react'
import ReactPaginate from 'react-paginate';
import * as API_Service from "./api/home-api";
import {Button} from 'reactstrap'
import "../styles.css"
const PER_PAGE=3;
class PacheteService extends React.Component{

constructor(props) {
         super(props);


                this.state = {
                dataFromParent:null,
                    pachetePromotionale: [],
                    pachete_perpage:[],
                    isloaded:false,
                    offset:0,
                    pageCount:0,
                    errorStatus:0,
                };
                this.concatenare_oferte=this.concatenare_oferte.bind(this);
                this.fetchPachet=this.fetchPachet.bind(this);
                 this.handlePageClick=this.handlePageClick.bind(this);

    }

    componentDidMount() {
            this.fetchPachet();
        }

concatenare_oferte(oferte){
let concat="";
var arrayLength = oferte.length;
for (var i = 0; i < arrayLength; i++) {
    console.log(oferte[i].oferta);
    if(i<arrayLength-1)
    concat=concat+oferte[i].oferta+"+"
    else
    concat=concat+oferte[i].oferta
}


return concat;
}


fetchPachet() {


               var id=localStorage.serviceid;

          return API_Service.getPachete(id,(result, status, err) => {

              if (result !== null && status === 200) {
                  this.setState({
                       pachetePromotionale: result,
                       pageCount : Math.ceil(result.length / PER_PAGE),
                       pachete_perpage : result.slice(this.state.offset, this.state.offset + PER_PAGE),
                      isLoaded: true,

                  });
                  console.log("Pachete promotionale: ");
                  console.log(this.state.pachetePromotionale);

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
console.log(this.state.pachete_perpage);
console.log(this.state.pachetePromotionale);
let dataperpage=this.state.pachetePromotionale.slice(pag,pag+PER_PAGE);
 this.setState({
            pachete_perpage: dataperpage,
            isLoaded:true,
        });
}


     render() {
return(
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
   {this.state.pachete_perpage.map((d) =>

                                          <div className={"style_box"}>
                                                <div className="box">
                                                      <p>
                                                        {this.concatenare_oferte(d.oferte_pachet)}
                                                        <span className="tag is-primary">:{d.pret} RON</span>
                                                      </p>

                                                      <p>Durata estimata:{d.durata_reparatie}</p>


                                                      <div className="is-clearfix">

                                                         <Button color="primary" onClick={()=>this.deletepachet(d.id)}>StergePachet</Button>

                                                      </div>
                                                 </div>
                                          </div>
                                                      )}
   <Button color="primary" href="/servicepage">Go to ServicePage</Button>

    </div>

);

            }

}
export default PacheteService ;