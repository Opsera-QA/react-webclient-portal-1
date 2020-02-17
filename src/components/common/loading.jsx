import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";

function LoadingDialog({ size }) {
  const [type, setType] = useState({});

  useEffect( () => {
    setType(size);
  }, [size]);

  
  if (type === "sm") {
    return (
      <div className="text-center">
        <Spinner as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true" /> 
      </div>
    );
  } else {
    return (
      <div className="loading">
        <div className="loader">
          <Spinner as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true" /> Loading...
        </div>
      </div>
    );
  }
  

}

LoadingDialog.propTypes = {
  size: PropTypes.string
};


export default LoadingDialog;