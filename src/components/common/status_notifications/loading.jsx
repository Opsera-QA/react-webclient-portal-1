import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LoadingDialog({ size, message }) {
  const [type, setType] = useState({});

  useEffect( () => {
    setType(size);
  }, [size]);

  
  if (type === "sm") {
    return (
      <div className="row" style={{ height:"250px", width: "100%" }}>
        <div className="col-sm-12 my-auto text-center">
          <FontAwesomeIcon icon={faSpinner} spin className="mr-2"/>
          {message && message}
        </div>
      </div>     
    );
  } else {
    return (
      <div className="loading">
        <div className="loader">
          <FontAwesomeIcon icon={faSpinner} size="2x" spin/>
        </div>
      </div>
    );
  }
  

}

LoadingDialog.propTypes = {
  size: PropTypes.string,
  message: PropTypes.string
};


export default LoadingDialog;