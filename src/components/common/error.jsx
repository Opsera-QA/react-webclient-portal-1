import React, { useReducer, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";

/**
 * @param {*} { error, align, type }
 * error: Is a string of either "sm" or "lg" with "sm" being just a centered icon, and large being full screen
 * align: center to do a vertical centering of the parent DIV or empty for inline
 * type: passes the "variant" value from Bootstrap of danger, warning, info, etc.
 * @returns
 */
function ErrorDialog({ error, align, type }) {
  const contextType = useContext(AuthContext);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { message: null, detail: null, statusCode: null, alignment: "inline", variant: "danger" }
  );

  const login = function() {
    const { loginUserContext } = contextType;
    loginUserContext();
  };

  useEffect( () => {
    let messageBody  = "";
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
    
    console.log("ERROR", error);
    setState({
      message: messageBody ? messageBody : error,
      detail: JSON.stringify(error),
      statusCode: error.response ? error.response.status : null,
      alignment: align ? align : state.alignment,
      variant: type ? type : state.variant 
    });
  }, [error]);

  const { statusCode, variant, alignment } = state;

  if (alignment === "center") {
    return (
      <div className="row h-100">
        <div className="col-sm-12 my-auto text-center">
          <Alert variant={variant}>
            {state.message}
            { statusCode === 401 &&
          <span style={{ marginLeft: "10px" }}><a href="#" onClick={() => { login(); }}>Click here to refresh login.</a></span>
            }
          </Alert>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mt-1 mb-3 max-content-module-width-50"> 
        <Alert variant={variant}>
          {state.message}
          { statusCode === 401 &&
          <span style={{ marginLeft: "10px" }}><a href="#" onClick={() => { login(); }}>Click here to refresh login.</a></span>
          }
        </Alert>
      </div>
    );}

}

ErrorDialog.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  align: PropTypes.string,
  type: PropTypes.string
};


export default ErrorDialog;

//max-content-module-width-50