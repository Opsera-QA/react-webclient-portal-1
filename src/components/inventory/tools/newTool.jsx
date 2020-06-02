import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import PropTypes from "prop-types";

import "./tools.css";

function NewTool(props) {

  const { getAccessToken } = useContext(AuthContext);
  const editTool = props.edittool.details;
  const formFields = [
    {
      label: "Name",
      id: "name",
      type: ""
    },
    {
      label: "Description",
      id: "description",
      type: ""
    },
    {
      label: "Tool",
      id: "tool_identifier",
      type: "select"
    },
    {
      label: "Contacts",
      id: "contacts",
      type: "textarea"
    },
    {
      label: "Project",
      id: "project",
      type: "textarea"
    },
    {
      label: "Application",
      id: "application",
      type: "textarea"
    },
    {
      label: "Location",
      id: "location",
      type: "textarea"
    },
    {
      label: "Organization",
      id: "organization",
      type: "textarea"
    },
    {
      label: "Tool Type",
      id: "tool_type_identifier",
      type: "select"
    },
    {
      label: "External Reference",
      id: "external_reference",
      type: "textarea"
    },
    {
      label: "Tags",
      id: "tags",
      type: "textarea"
    },
    {
      label: "Licensing",
      id: "licensing",
      type: "textarea"
    },
    {
      label: "Compliance",
      id: "compliance",
      type: "textarea"
    },
    {
      label: "Active",
      id: "active",
      value: true,
      type: "switch"
    }
  ];

  const [ toolFormFields, setFormFields ] = useState({ active: true });
  const [ tool_list, setToolList ] = useState({
    tool_type_identifier: [], 
    tool_identifier: []
  });

  useEffect(() => {    
    getToolList();
  }, []);

  useEffect(() => {    
    setFormFields({
      ...toolFormFields,
      ...props.edittool.details
    });
  }, [props.edittool.details]);

  const getToolList = async () => {
    try {
      const accessToken = await getAccessToken();
      const toolResponse = await axiosApiService(accessToken).get("/registry/tool", {});
      const typeResponse = await axiosApiService(accessToken).get("/registry/type", {});
      setToolList({
        tool_identifier: toolResponse.data,
        tool_type_identifier: typeResponse.data
      });
    }
    catch (err) {
      console.log(err.message);
    }
  };

  const createNewTool = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axiosApiService(accessToken).post("/registry/create", { ...toolFormFields });
      console.log(response.data);
      props.closeModal(false);
    }
    catch (err) {
      console.log(err.message);
    }
  };

  const updateTool = async () => {
    try {
      const accessToken = await getAccessToken();
      await axiosApiService(accessToken).post("/registry/"+ props.edittool.id + "/update", { ...toolFormFields });
      props.closeModal(false);
    }
    catch (err) {
      console.log(err.message);
    }
  };

  const handleClose = () => props.closeModal(false);

  const formFieldType = (field) => {
    switch (field.type) {
    case "switch":
      return <Form.Check 
        type="switch"
        id="custom-switch"
        label="Check this switch"
        defaultValue={true}
        onChange={e => setFormFields({ ...toolFormFields, [field.id]: e.target.value })}
      />;
    case "textarea":
      return <Form.Control 
        as="textarea"
        rows={2}
        onChange={e => setFormFields({ ...toolFormFields, [field.id]: e.target.value })}
      />;     
    case "select":
      return <Form.Control as="select" onChange={e => setFormFields({ ...toolFormFields, [field.id]: e.target.value })}>
        {tool_list[field.id].map((option, i) => (
          <option key={i}>{option.name}</option>
        ))} 
      </Form.Control>;
    default:
      return  <Form.Control defaultValue={editTool[field.id]}  onChange={e => setFormFields({ ...toolFormFields, [field.id]: e.target.value })} />;
    }
  };

  return (
    <>
      <Modal size="lg" show={props.showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.type == "new" ? "New" : "Edit"} Tool</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>

          <Button variant="primary" onClick={props.type == "new" ? createNewTool : updateTool} disabled={Object.keys(toolFormFields).length == 0 }>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

NewTool.propTypes = {
  showModal: PropTypes.bool,
  type: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  edittool: PropTypes.object
};


export default NewTool;