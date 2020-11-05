import React, {Component} from 'react';
import {addComment} from '../../core/apiCore';
import {isAuthenticated} from '../../auth/index';
import {alerts, commentValidator} from '../../utils/validators';

class AddComment extends Component {
  state = {comment: '', err: null};

  submitComment = e => {
    e.preventDefault();
    const {comment} = this.state;
    const commentValidationError = commentValidator(comment).err;
    if (commentValidationError) this.setState({err: commentValidationError});
    else {
      const user = isAuthenticated().user;
      let usertoken= localStorage.getItem('jwt');
      usertoken=JSON.parse(usertoken);
      console.log(usertoken);
    //   const token = isAuthenticated().user.token;
      const productId = this.props.productId;
      addComment(usertoken.token, productId, comment)
        .then(result => {
          
          this.setState({comment: '', err: null});
        })
        .catch(err => this.console.log({err}));
    }
  };

  render() {
    return (
      <>
        <h4>Leave a Comment:</h4>
        <form onSubmit={this.submitComment}>
          {alerts(this.state.err)}
          <div className="form-group ml-5">
            <input type="text" className="form-control" onChange={e => this.setState({comment: e.target.value})}
              value={this.state.comment} />
          </div>
          <button className=" ml-5" type="submit">Add Comment</button>
        </form>
      </>
    );
  } 
}

export default AddComment;


















































// import React, { useState, useEffect } from 'react';
// import { read, listRelated,writeReview} from '../../core/apiCore';

// import {isAuthenticated} from '../../auth/index';

// const AddReview = props => {
  
    
//     const [username, setName] = useState('');
//     const [comment, setComment] = useState('');
//     const [error, setError] = useState(false);
//     const [success,setSuccess] = useState(false);

 
//     const {user} = isAuthenticated();
//     const token =  isAuthenticated().token;
    

//     const handleChange = e => {
//       setError('');
//       setComment(e.target.value);
//   };
//   const handleChangeName = e => {
//     setError('');
//     setName(e.target.value);
// };
  
// const clickSubmit = e => {
//   e.preventDefault()
//   setError('');
//   setSuccess(false);
//   //make request to api to create category
//   writeReview(user._id,token,username,comment)
//   .then(data => {
//     console.log(data);
//       if(data.error){
//         console.log(data.error);
//           setError(true);
//       }
//       else{
//           setError('');
//           setSuccess(true);
//       }
//   });
// };

//     if (!isAuthenticated()) {
//         setError( "Please signin to leave a comment" );
//         return false;
//     }

//     const showSuccess = () => {
//         if(success) {
//             return <h3 >Your review has been added</h3>
//         }
//     }
//     const showError = () => {
//       if(error) {
//           return <h3 >There was some error. Please try again</h3>
//       }
//     }

// return (
        
//    <div>
//        {showSuccess()}
//        {showError()}
//        <form onSubmit={clickSubmit}>
//           <div>
//               <input
//               type="text"
//               placeholder="Enter your Name"
//               onChange={handleChangeName}> 
//               </input>   
//           </div>
//           <div>
//               <textarea
//               placeholder="Add your Review"
//               onChange={handleChange}> 
//               </textarea>   
//           </div>
  
//           <button>Add Review</button>
//       </form>
//   </div>
// );

// };

// export default AddReview;


