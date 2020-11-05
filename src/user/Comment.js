import React from 'react';
import {Link} from 'react-router-dom';
import {delComment} from '../core/apiCore';
const Comment = props => {
  const {_id, comment, createdAt, commenter} = props.comment;
  const {user, productId,updateProduct} = props;
  return (
    <div className="card border-dark mb-3 p-2">
      <div className="card-text">{comment}</div>
      <div className="card-footer text-muted">
        <Link to={`/user/${commenter._id}`} style={{textDecoration: 'none'}}>
          <em style={{fontSize: '0.8rem'}}>{commenter.name} {new Date(createdAt).toLocaleString()}</em>
        </Link>
     
      </div>
    </div>
  );
};
export default Comment;
