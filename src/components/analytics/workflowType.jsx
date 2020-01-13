/* eslint-disable no-unused-vars */

import React, {useReducer, useEffect} from "react";
//import PropTypes from "prop-types";
//import { AuthContext } from "../../contexts/AuthContext";
import { Card, Form, Button } from "react-bootstrap";

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
          <Card.Title>Analytics Settings</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">We offer analytics for Infrastructure and Pipeline.  
          Make your choice.</Card.Subtitle>
          <Card.Text>
            <Form>
              <div key="inline-checkbox-workflow" className="mb-1 mt-2 p-2">
                <Form.Check inline label="Infrastructure" type="checkbox" id="inline-checkbox-workflow-1" />
                <Form.Check inline label="Pipeline" type="checkbox" id="inline-checkbox-workflow-2" />
              </div>

              <div className="mt-3 text-muted">Choose a data usage limit per day:</div>
              <div key="inline-radio-data-limit" className="mt-1 p-2">
                <Form.Check inline label="500 MB" type="radio" id="inline-radio-data-limit-1" />
                <Form.Check inline label="1 GB" type="radio" id="inline-radio-data-limit-2" />
                <Form.Check inline label="2 GB" type="radio" id="inline-radio-data-limit-3" />
                <Form.Check inline label="3 GB" type="radio" id="inline-radio-data-limit-4" />
              </div>

              <div className="text-right">
                <Button variant="outline-secondary">Save</Button>
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