import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import { useParams } from "react-router-dom";

import "components/inventory/tools/tools.css";

function ToolConfiguration(props) {
  const toolId = props.toolId;
  const toolData = props.toolData;
  const [ toolFormFields, setFormFields ] = useState({ active: true });
  const [ tool_list, setToolList ] = useState({
    tool_type_identifier: [], 
    tool_identifier: []
  });
  const formFields = [
    {
      label: "Jenkins Container URL",
      id: "name",
      type: "",
      disabled: false
    },
    {
      label: "Jenkins Port",
      id: "description",
      type: "", 
      disabled: false
    },
    {
      label: "Jenkins User ID",
      id: "tool_identifier",
      type: "",
      disabled: false
    },  
    {
      label: "Jenkins Token",
      id: "contacts",
      type: "",
      disabled: false
    }
  ];

  const formFieldType = (field) => {
    switch (field.type) {
    case "switch":
      return <Form.Check 
        type="switch"
        id="custom-switch"
        label="Active"
        defaultValue={true}
        onChange={e => setFormFields({ ...toolFormFields, [field.id]: e.target.value })}
      />;
    case "textarea":
      return <Form.Control 
        as="textarea"
        rows={2}
        disabled={field.disabled}
        onChange={e => setFormFields({ ...toolFormFields, [field.id]: e.target.value })}
      />;     
    case "select":
      return <Form.Control as="select" placeholder="Please select" onChange={e => setFormFields({ ...toolFormFields, [field.id]: e.target.value })}>
        {tool_list[field.id].map((option, i) => (
          <option key={i}>{option.name}</option>
        ))} 
      </Form.Control>;
    default:
      return  <Form.Control disabled={field.disabled}  onChange={e => setFormFields({ ...toolFormFields, [field.id]: e.target.value })} />;
    }
  };

  return (
    <>
      <Form className="formContainer">
        {formFields.map((field, i) => {
          return(
            <Form.Group key={i} controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                {field.label}
              </Form.Label>
              <Col sm="10">
                {formFieldType(field)}
              </Col>
            </Form.Group>
          );
        })}
      </Form>
    </>
  );
}

ToolConfiguration.propTypes = {};


export default ToolConfiguration;
