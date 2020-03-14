import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

function ToolConfigurationSelect( { data, parentCallback }) {
  


  const callbackFunction = (item) => {
    // pass updated data object to parent object for POST operation
    parentCallback(item);
  };

  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Jenkins Select! address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="button" onClick={() => { callbackFunction(); }}>
                Submit
      </Button>
    </Form>
  );
}

ToolConfigurationSelect.propTypes = {
  data: PropTypes.object,
  parentCallback: PropTypes.func
};

export default ToolConfigurationSelect;