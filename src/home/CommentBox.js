
import React from 'react'
import jwt_decode from "jwt-decode";
import * as API_Reviews from "./api/home-api"
import {Button} from 'reactstrap'
import StarRatings from 'react-star-ratings';
class CommentBox extends React.Component {
  constructor() {
    super();

    this.state = {
    serviceid:localStorage.getItem('serviceid'),
      showComments: false,
      data:[],
      comments: [],
      review:'',
      serviceRating:5,
      comentariuEfectuat:false,

    };
    this.fetchReviews=this.fetchReviews.bind(this);
    this.makecomentform=this.makecomentform.bind(this);
    this.handleClick=this.handleClick.bind(this);
    this.addComment=this.addComment.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.fetchRating=this.fetchRating.bind(this);
    this.changeRating=this.changeRating.bind(this);

  }

  componentDidMount(){
  this.fetchReviews();
  this.fetchRating();
  }
fetchReviews(){

                         return API_Reviews.getReviews(this.state.serviceid,(result, status, err) => {

                             if (result !== null && status === 200) {
                                    let coments=[];
                                    let coment={id:0,author:'',body:''}
                                  var arrayLength = result.length;
                                  for (var i = 0; i < arrayLength; i++) {
                                  coment.id=result[i].id;
                                  coment.author=result[i].review;
                                   coment.body=result[i].account.username;
                                   coments.push(coment);
                                  }
                                 this.setState({
                                     data: result,
                                     comments:coments,
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
  fetchRating(){

                           return API_Reviews.getserviceRating(this.state.serviceid,(result, status, err) => {

                               if (result !== null && status === 200) {

                                   this.setState({
                                       serviceRating: result,
                                       isLoaded: true,

                                   });

                               } else {
                                   this.setState(({
                                   serviceRating: 0,
                                       errorStatus: status,
                                       error: err
                                   }));
                               }
                           });
                           }


    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;
        this.state.review=value;
        console.log("review:"+this.state.review);
        }
makecomentform(){

 if(typeof localStorage.getItem('bearer')!== "undefined" && localStorage.getItem("bearer") !== null){
   var decoded = jwt_decode(localStorage.getItem('bearer'));
   if(decoded.roles.authority=='USER')
    return (
      <form className="comment-form" onSubmit={this.addComment}>
        <div className="comment-form-fields">
          <textarea placeholder="Comment" rows="4" onChange={this.handleChange}></textarea>
        </div>
        <div className="comment-form-actions">
          <Button onClick={this.addComment}>Post Comment</Button>
        </div>
      </form>
    );}
    else
    return <p>Pentru a lasa un review va rugam sa va logati</p>
}
changeRating(rating){
console.log("rating: "+rating);
this.setState({
               serviceRating:rating,
                 });
}


handleClick() {
    this.setState({
      showComments: !this.state.showComments
    });
  }

  addComment() {
  console.log("suntem in addcoment")
    var token=localStorage.getItem('bearer');
    var review={review:this.state.review,
                nota:this.state.serviceRating}


    API_Reviews.addReview(review,token,this.state.serviceid,(result, status, err) => {

                                                             if (result !== null && status === 200) {

                                                                 this.setState({
                                                                     isLoaded: true,
                                                                     comentariuEfectuat:true,

                                                                 });

                                                             } else {
                                                                 this.setState(({
                                                                     errorStatus: status,
                                                                    // comentariuEfectuat:true,
                                                                     error: err,

                                                                 }));
                                                             }
                                                         });
     this.fetchReviews();
      this.fetchRating();
    }
  render () {
  console.log("valoare:"+this.state.comentariuEfectuat)
  if(this.state.comentariuEfectuat){
  return(<p>Va multumim pentru nota si comentariul acordat</p>)
  }
  else{
    let commentNodes;
    let buttonText = 'Show Comments';
    let comentform = this.makecomentform();


    if (this.state.showComments) {
      buttonText = 'Hide Comments';
      commentNodes = <div className="comment-list">
       {
       this.state.comments.map((comment) =>

                             <div className="comment">
                             <p className="comment-header">{comment.author}</p>
                            <p className="comment-body">- {comment.body}</p>
                             </div>)}

       </div>
    }

    return(
      <div className="comment-box">
        <h2>Lasa-ti un review acestui service!</h2>
         <StarRatings
                  rating={this.state.serviceRating}
                  starRatedColor="blue"

                  changeRating={this.changeRating}
                  numberOfStars={5}
                  name='rating'
                />
        {comentform}
        <button id="comment-reveal" onClick={this.handleClick}>
          {buttonText}
        </button>
        <h3>Comments</h3>
        <h4 className="comment-count">
          {this.state.comments.length} reviews
        </h4>
        {commentNodes}
      </div>
    );
    }
  } // end render




}





export default CommentBox;
