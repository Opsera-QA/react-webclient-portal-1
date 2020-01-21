import React, { useReducer, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";

function ErrorDialog({ error }) {
  const contextType = useContext(AuthContext);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { message: null, detail: null }
  );

  const login = function() {
    const { loginUserContext } = contextType;
    loginUserContext();
  };

  if (error.response) {
    error.message = `Status ${error.response.status}: `;
    error.message += error.response.data.message ? error.response.data.message : JSON.stringify(error.response.data);
  }

  useEffect( () => {
    setState({
      message: error.message ? error.message : error,
      detail: JSON.stringify(error)
    });
  }, [error]);

  const { response } = error;
  const { status } = response;
  return (
    <div className="mt-1 mb-3">
      <Alert variant="danger">
        {state.message}
        { status === 401 &&
          <span style={{ marginLeft: "10px" }}><a href="#" onClick={() => { login(); }}>Click here to refresh login.</a></span>
        }
      </Alert>
    </div>
  );

}

ErrorDialog.propTypes = {
  error: PropTypes.object
};


export default ErrorDialog;