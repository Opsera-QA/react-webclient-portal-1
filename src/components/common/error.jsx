import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";


function ErrorDialog({ error }) {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { message: null, detail: null }
  );

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

  return (
    <div className="mt-1 mb-3">
      <Alert variant="danger">
        {state.message}
      </Alert>
    </div>
  );

}

ErrorDialog.propTypes = {
  error: PropTypes.object
};


export default ErrorDialog;