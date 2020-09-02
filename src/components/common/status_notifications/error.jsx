import React, { useReducer, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

/**
 * @param {*} { error, align, type }
 * error: Is a string of either "sm" or "lg" with "sm" being just a centered icon, and large being full screen
 * align: center to do a vertical centering of the parent DIV or empty for inline
 * type: passes the "variant" value from Bootstrap of danger, warning, info, etc.
 * @returns
 */
function ErrorDialog({ error, align, type, setError }) {
  //const contextType = useContext(AuthContext);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { message: null, detail: null, statusCode: null, alignment: "inline", variant: "danger" },
  );

  const reloadSession = function() {
    //const { renewUserToken } = contextType;
    console.log("Error.jsx: triggering login function in error.jsx (window reload)");
    //renewUserToken(); //This triggers a full state refresh of the application, downside is it redirect to home
    window.location.reload(false); //trying this out for improved user experience if it works
  };

  const clearError = () => {
    setError(() => {
      return false;
    });
  };

  useEffect(() => {
    let messageBody = "";
    if (error) {
      if (error.response) {
        messageBody = `Status ${error.response.status}: `;
        messageBody += error.response.data.message ? error.response.data.message : JSON.stringify(error.response.data);
      } else if (error.message) {
        messageBody = error.message;
      }
    } else {
      error = "Undefined";
    }

    setState({
      message: messageBody ? messageBody : error,
      detail: JSON.stringify(error),
      statusCode: error.response ? error.response.status : null,
      alignment: align ? align : state.alignment,
      variant: type ? type : state.variant,
    });
  }, [error]);

  const { statusCode, alignment } = state;

  if (alignment === "center") {
    return (
      <div className="row h-100">
        <div className="col-sm-12 my-auto text-center">
          <div className="error-text">
            {state.message} {(statusCode === 401 || (state.message && state.message.includes("401"))) &&
          <span className="ml-1"><a href="#" onClick={() => {
            reloadSession();
          }}>Click here to renew session.</a></span>}
          </div>
        </div>
      </div>
    );
  }

  if (alignment === "detailPanelTop") {
    return (
      <div className="row error-block top-dialog-detail-panel-block m-2">
        <div className="col-sm-12 my-auto text-center">
          <div className="float-right ml-1">
            <FontAwesomeIcon icon={faTimes} style={{ cursor: "pointer" }} onClick={() => {
              clearError();
            }}/>
          </div>
          {state.message} {(statusCode === 401 || (state.message && state.message.includes("401"))) &&
        <span className="ml-1"><a style={{ color: "#fff", textDecoration: "underline" }} href="#" onClick={() => {
          reloadSession();
        }}>Click here to renew session.</a></span>}
        </div>
      </div>
    );
  }

  if (alignment === "top") {
    return (
      <div className="w-100 error-block top-error-block">
        <div className="float-right ml-1">
          <FontAwesomeIcon icon={faTimes} style={{ cursor: "pointer" }} onClick={() => {
            clearError();
          }}/></div>
        {state.message} {(statusCode === 401 || (state.message && state.message.includes("401"))) &&
      <span className="ml-1"><a style={{ color: "#fff", textDecoration: "underline" }} href="#" onClick={() => {
        reloadSession();
      }}>Click here to renew session.</a></span>}
      </div>
    );
  }

  return (
    <div className="mx-3 my-3 max-content-module-width-50">
      <div className="error-text">
        {state.message} {(statusCode === 401 || (state.message && state.message.includes("401"))) &&
      <span className="ml-1"><a href="#" onClick={() => {
        reloadSession();
      }}>Click here to renew session.</a></span>}
      </div>
    </div>
  );


}

ErrorDialog.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  align: PropTypes.string,
  type: PropTypes.string,
  setError: PropTypes.func,
};


export default ErrorDialog;

//max-content-module-width-50