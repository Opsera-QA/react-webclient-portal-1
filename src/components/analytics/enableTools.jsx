/* eslint-disable no-unused-vars */

import React, {useReducer, useEffect} from "react";
//import PropTypes from "prop-types";
//import { AuthContext } from "../../contexts/AuthContext";
import { Card, Form, Button } from "react-bootstrap";

/**
 * Component to allow tool selection for Kibana registration
 *
 */
function EnableTools() {
  //const contextType = useContext(AuthContext);
  /* const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {loaded: false, fetching: false, data: null, error: null, messages: null}
  ); */


  /* useEffect( () => {
    setState({fetching: true});
    setState({data: workflowTypes});
    console.log(workflowTypes);
  }, []); */

  return (
    <div className="mt-3 mb-3">
      <Card>
        <Card.Body>
          <Card.Title>Supported Tools</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">The following tools are currently supported with the Analytics 
          Platform.  Please select the tools you want to enable for Analytics.</Card.Subtitle>
          
          <Form>
            <div key="checkbox-enable-tools" className="mb-1 mt-2 p-2">
              <Form.Check inline label="Jenkins" type="checkbox" id="checkbox-enable-tools-1" />
              <Form.Check inline label="JUnit" type="checkbox" id="checkbox-enable-tools-2" />
              <Form.Check inline label="JMeter" type="checkbox" id="checkbox-enable-tools-3" />
              <Form.Check inline label="Sonar" type="checkbox" id="checkbox-enable-tools-4" />
            </div>

            <div className="text-right">
              <Button variant="outline-secondary">Save</Button>
            </div>
          </Form>
          
        </Card.Body>
      </Card>
    </div>
  );
}

/* EnableTools.propTypes = {
  workflowTypes: PropTypes.object
}; */

export default EnableTools;