/* eslint-disable no-unused-vars */

import React, {useReducer, useEffect} from "react";
//import PropTypes from "prop-types";
//import { AuthContext } from "../../contexts/AuthContext";
import { Card, Form } from "react-bootstrap";

/**
 * Analytics Workflow Check Box: Infrastructure and/or Platform
 *
 */
function WorkflowType() {
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
    <div>
      <Card>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">We offer analytics for Infrastructure and Pipeline.  
          Make your choice.</Card.Subtitle>
          <Card.Text>
            <Form>
              <div key="inline-checkbox" className="mb-3 mt-2 p-2">
                <Form.Check inline label="Infrastructure" type="checkbox" id="inline-checkbox-1" />
                <Form.Check inline label="Pipeline" type="checkbox" id="inline-checkbox-2" />
              </div>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

/* WorkflowType.propTypes = {
  workflowTypes: PropTypes.object
}; */

export default WorkflowType;