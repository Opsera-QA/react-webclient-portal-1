import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import PropTypes from "prop-types";

function NewTool(props) {

  const { getAccessToken } = useContext(AuthContext);
  const editTool = props.edittool;
  // const initialState = {
  //   "name": "",
  //   "description": "",
  //   "tool_identifier": "",
  //   "tool_type_identifier": "",
  //   "contacts": [],
  //   "project": [],
  //   "application": [],
  //   "location": {},
  //   "organization": {},
  //   "external_reference": [], 
  //   "tags": [],
  //   "roles": [], 
  //   "configuration": {}, 
  //   "licensing": {},
  //   "compliance": {},
  //   "active": true,
  //   "status": "String"
  // };
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

  const [ toolFormFields, setFormFields ] = useState({ ...props.edittool });
  const [ tool_list, setToolList ] = useState({
    tool_type_identifier: [], 
    tool_identifier: []
  });

  useEffect(() => {    
    getToolList();
  }, []);

  useEffect(() => {    
    setFormFields(props.edittool);
  }, [props.edittool]);

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
      const postBody = {
        data: [ toolFormFields ]
      };
      const response = await axiosApiService(accessToken).post("/registry/create", postBody);
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
      const postBody = {
        data: [toolFormFields ]
      };
      await axiosApiService(accessToken).post("/registry/create", postBody);
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
      <Modal show={props.showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.type == "new" ? "New" : "Edit"} Tool</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {formFields.map((field, i) => {
              return(
                <Form.Group as={Row} key={i} controlId="formPlaintextEmail">
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
          {}
          <Button variant="primary" onClick={props.modalType == "new" ? createNewTool : updateTool} disabled={Object.keys(toolFormFields).length == 0 }>Save changes</Button>
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