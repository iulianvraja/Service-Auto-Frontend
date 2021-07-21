
 import React from 'react'
 import * as APIOferte from "../ServiceManagerPage/api/ManagerApi"
 import Button from "react-bootstrap/Button";

import Select from 'react-select'

import { FormGroup, Input, Label} from 'reactstrap';
 const scroller ={
         margin: 'auto',
         height: '100%',
         width: '80%',
         border:"2px solid blue",
         margin:'50px',
         overflow: 'auto',
       }


 class AdaugaPachetPromotional extends React.Component{
        constructor(props){

            super(props)

            this.state={
             oferteGetBySearch:[],
             ofertePachet:[],
             durata_reparatie:'',

                 searchOnChange:'',
                 pret:0,
                 errorStatus:0,

            isLoaded:false,

}
this.fetchOfertaString=this.fetchOfertaString.bind(this);
this.fetchofertabyname=this.fetchofertabyname.bind(this);
this.handleChange=this.handleChange.bind(this);
}
componentDidMount(){
this.fetchOfertaString();
}

handleChange = event => {


        if(event.target.name=='pret')
         this.state.pret=this.state.pret- this.state.pret* Number(event.target.value)/100;

        if(event.target.name=='durata_reparatie')
        this.state.durata_reparatie=event.target.value;

       // console.log("ce trimitem la pachet: "+this.state.searchOnChange);


    };
    handleChange2(variabila){
    console.log("valoare search:"+variabila.value)
     this.state.searchOnChange=variabila.value;
    }


fetchofertabyname(){
var numeoferta=this.state.searchOnChange;
var token=localStorage.bearer;
const data=new FormData();
data.append('numeoferta',numeoferta);
 APIOferte.getOfertaByName(data,token,(result, status, err) => {

              if (result !== null && status === 200) {
              var pret1=result.pret;
              var vec=this.state.oferteGetBySearch;
              vec.push(result);
                  this.setState({
                      isLoaded: true,
                      oferteGetBySearch:vec,
                      pret:this.state.pret+pret1,
                  });

              } else {
                  this.setState(({
                      errorStatus: status,
                      error: err
                  }));
              }
          });

}
fetchOfertaString(){
var token=localStorage.bearer;
 return APIOferte.getOferteStringByService(token,(result, status, err) => {

              if (result !== null && status === 200) {
             let rezultat=[]
              rezultat=result.map(x => ({value:x+'',label: x+''}));
              console.log(rezultat[0])
                  this.setState({
                     ofertePachet:rezultat,

                       isLoaded:true

                  });

              } else {
                  this.setState(({
                      errorStatus: status,
                      error: err
                  }));
              }
          });
}
deletefrompachet(d){
var pachet2=[];
var arrayLength = this.state.oferteGetBySearch.length;
for (var i = 0; i < arrayLength; i++) {
    if(this.state.oferteGetBySearch[i]!=d)
        pachet2.push(this.state.oferteGetBySearch[i]);
    //Do something
}

 this.setState({
                  oferteGetBySearch:pachet2,

                  });
}
submitpachet(){

var token=localStorage.bearer;
 var pachet={
            'durata_reparatie':'',
            'oferte_pachet': [],
            'pret': 0,
            };

             pachet['pret']=this.state.pret
            pachet['oferte_pachet']=this.state.oferteGetBySearch
             pachet['durata_reparatie']=this.state.durata_reparatie

return APIOferte.insertPachet(pachet,token,(result, status, err) => {

              if (status === 200) {

              console.log("am reusit inserarea")
                  this.setState({
                   oferteGetBySearch:[],
                   durata_reparatie:'',
                   searchOnChange:'',
                   pret:0,
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
       <div display="inline-block" margin-top= '50px'>
       <div>

      <Select name="search" display= "inline-block" onChange={value=>this.handleChange2(value)} width="50px" options={this.state.ofertePachet} />
        <Button onClick={this.fetchofertabyname}>Adauga Aceasta Oferta In Pachet</Button>
       </div>

         <div>
         <p>Oferte Adaugate in Pachetul Promotional</p>
         <div style={scroller}>
            {this.state.oferteGetBySearch.map((d) =>

                                                   <div className=" column is-half">
                                                         <div className="box">
                                                           <div className="media">
                                                             <div className="media-left">
                                                             </div>
                                                             <div className="media-content">
                                                               <b style={{ textTransform: "capitalize" }}>
                                                                 {d.oferta}{" "}
                                                                 <span className="tag is-primary">:{d.pret}</span>
                                                               </b>
                                                               <div>
                                                                <p>Durata estimata:{d.durata_reparatie}</p>
                                                               <p>Nivelul Reparatiei:{d.cod_reparatie}</p>
                                                               </div>

                                                               <div className="is-clearfix">

                                                                  <Button color="primary" onClick={()=>this.submitpachet}>Delete</Button>


                                                               </div>



                                                             </div>
                                                           </div>
                                                         </div>



                                                       </div>

                                                       )}
           <p>Pret Pachet: {this.state.pret}</p>

         </div>

          <FormGroup id='pret'>
                             <Label for='pretField'> ReducerePachet %: </Label>
                             <Input style={{width: "50px"}} name='pret' id='pretField'
                                    onChange={this.handleChange}
                                    required
                             />
                         </FormGroup>

           <FormGroup id='durata_reparatie'>
                                       <Label for='durata_reparatieField'> Durata Reparatie estimata: </Label>
                                       <Input style={{width: "200px"}} name='durata_reparatie' id='durata_reparatieField'
                                              onChange={this.handleChange}
                                              required
                                       />
                                   </FormGroup>

           <Button color="primary" href="/managerpage/adaugaPachetPromotional" onClick={()=>this.submitpachet()}>Submit</Button>

           <Button color="primary" href="/managerpage">Go to Homepage</Button>
         </div>


        </div>
       )
     }
   }

export default AdaugaPachetPromotional;