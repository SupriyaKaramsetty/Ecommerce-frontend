import React from 'react';

// render alert boxes
export const alerts = (err=null, msg=null) => (
  <div>
    <div className="alert alert-danger" role="alert" style={{display: err ? "" : "none"}}>{err}</div>
    <div className="alert alert-success" role="alert" style={{display: msg ? "" : "none"}}>{msg}</div>
  </div>
);

// validate comment
export const commentValidator = comment => {
    if (comment.length < 2 || comment.length > 150) return {err: 'Comment must be 2 to 150 characters long'};
    return {err: null};
  };
  

// email validation for 'ForgotPassword' component
export const emailValidation = email => {
  if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) return {err: 'Email is not valid!'};
  return {err: null};
};

