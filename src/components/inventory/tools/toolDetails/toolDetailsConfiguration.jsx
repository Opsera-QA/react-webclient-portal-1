import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import { useParams } from "react-router-dom";


import JenkinsConfiguration from "../forms/jenkins";

import "components/inventory/tools/tools.css";

//TODO: Please move this form into the /inventory/tools/forms/jenkins.jsx.
/*  
Each tool will have its own configuration form/component just like in pipeilnes under /workflow/forms
This compontent will pass the toolID and toolData as well as a parent callback function into it.

I commented out the previous code and you can remove it once you have this working.  As a comparison look at:
src/components/workflow/forms/stepToolConfiguration.jsx
src/components/workflow/forms/jenkins.jsx

*/
function ToolConfiguration(props) {
  const toolId = props.toolId;
  const toolData = props.toolData;
  const [ toolFormFields, setFormFields ] = useState({ active: true });
  const [ tool_list, setToolList ] = useState({
    tool_type_identifier: [], 
    tool_identifier: []
  });
  
  
  const saveToolConfiguration = (item) => {
    //todo: this needs to be an API call to save the data around the configuration passed up from the child compontents.  
    //Alternatively you can pass this up one more step to this componetnts parent IF you already have saving logic there.  That is fine.
    //item is the configuration object from the child object (jenkins.jsx in this case)

  };
  
  /* 
  //no longer needed here
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
  }; */

  return (
    <div className="mt-4 p-2">
      <div className="text-muted pb-3">Enter tool specific configuration information below.  These settings will be used in pipelines</div>
      { typeof(toolId) !== "undefined" ? 
        <>
          {toolData.tool_identifier.toLowerCase() === "jenkins" ? <JenkinsConfiguration toolId={toolId} toolData={toolData} parentCallback={saveToolConfiguration} /> : null }
          

        </> : null}

      {/*
      no longer needed here
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
      </Form> */}
    </div>
  );
}

ToolConfiguration.propTypes = {};


export default ToolConfiguration;
