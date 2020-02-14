import React, { useReducer, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";

function ErrorDialog({ error }) {
  const contextType = useContext(AuthContext);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { message: null, detail: null, statusCode: null }
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
      statusCode: error.response ? error.response.status : null
    });
  }, [error]);

  const { statusCode } = state;

  return (
    <div className="mt-1 mb-3">
      <Alert variant="danger">
        {state.message}
        { statusCode === 401 &&
          <span style={{ marginLeft: "10px" }}><a href="#" onClick={() => { login(); }}>Click here to refresh login.</a></span>
        }
      </Alert>
    </div>
  );

}

ErrorDialog.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
};


export default ErrorDialog;