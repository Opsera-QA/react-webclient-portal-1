import React, { useReducer, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";
import { AuthContext } from "../../../contexts/AuthContext";
import { LazyLog } from "react-lazylog";

// Implements this library: https://mozilla-frontend-infra.github.io/react-lazylog/#lazylog

function DemoLogView({ system }) {
  const contextType = useContext(AuthContext);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { message: null, detail: null, statusCode: null }
  );

  const url = "https://gist.githubusercontent.com/helfi92/96d4444aa0ed46c5f9060a789d316100/raw/ba0d30a9877ea5cc23c7afcd44505dbc2bab1538/typical-live_backing.log";

  useEffect( () => {
    /* TODO: Some code here to parse the "system" object passed into this object which 
    defines where to connect to get the data */
    
  }, [system]);

  return (
    <div className="mt-1 mb-3" style={{ height: 500, width: 902 }}>
      <LazyLog extraLines={1} enableSearch url={url} caseInsensitive />
    </div>
  );

}

DemoLogView.propTypes = {
  system: PropTypes.object
};


export default DemoLogView;