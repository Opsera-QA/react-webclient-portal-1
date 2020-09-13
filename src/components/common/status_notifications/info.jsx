import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";


function InformationDialog ({ message, align, setMessage }) {

/*
  useEffect(() => {

  }, []);
*/


  const clearMessage = () => {
    setMessage(() => {
      return false;
    });
  };

  if (align === "top") {
    return (
      <div className="w-100 info-block top-error-block">
        {setMessage && <div className="float-right ml-1">
          <FontAwesomeIcon icon={faTimes} style={{ cursor: "pointer" }} onClick={() => {
            clearMessage();
          }}/></div> }
        {message}
      </div>
    );
  }

  return (
    <div className="mt-1 mb-3">
      <div className="info-text p-1">
        {message}
      </div>
    </div>
  );
}

InformationDialog.propTypes = {
  message: PropTypes.string,
  align: PropTypes.string,
  setMessage: PropTypes.func
};
export default InformationDialog;