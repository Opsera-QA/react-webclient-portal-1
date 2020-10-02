import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-light-svg-icons";


function LoadingDialog({ size, message }) {
  const [type, setType] = useState({});

  useEffect( () => {
    setType(size);
  }, [size]);

  
  if (type === "sm") {
    return (
      <div className="row" style={{ height:"250px", width: "100%" }}>
        <div className="col-sm-12 my-auto text-center text-muted" style={{fontSize: "larger"}}>
          <FontAwesomeIcon icon={faSpinner} spin className="mr-2"/>
          {message && message}
        </div>
      </div>     
    );
  }

  //same layout as sm, but larger animated icon
  if (type === "md") {
    return (
      <div className="row" style={{ height:"250px", width: "100%" }}>
        <div className="col-sm-12 my-auto text-center text-muted" style={{fontSize: "1.3em"}}>
          <FontAwesomeIcon icon={faSpinner} spin className="mr-2"
          style={{verticalAlign: "middle"}}/>
          {message && message}
        </div>
      </div>
    );
  }

  return (
      <div className="loading">
        <div className="loader">
          <FontAwesomeIcon icon={faSpinner} size="2x" spin/>
        </div>
      </div>
    );


}

LoadingDialog.propTypes = {
  size: PropTypes.string,
  message: PropTypes.string
};


export default LoadingDialog;