import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import PropTypes from "prop-types";
import MultiInputFormField from "./multiInputFormField";


//TODO: Please wire this data object up and use it for the form
const INITIAL_FORM = {
  name: "",
  description: "",
  tool_identifier: "", 
  tool_type_identifier: "",  //please make sure this value gets set based on the user's drop down selection for Tool.  The user should not be allowed to directly set this value.
  contacts: [],
  projects: [],
  applications: [],
  location: [], 
  organization: {},
  external_reference: [],
  tags: [],  //["tag1","tag2","tag3"]
  roles: [], //what user or group has access to: read, write, edit, delete
  configuration: {},
  licensing: [], 
  compliance: [],
  active: true,
  status: ""
};


function NewTool(props) {

  const { getAccessToken } = useContext(AuthContext);
  const editTool = props.editTool.details;
  const formFields = [
    {
      label: "Name",
      id: "name",
      type: "",
      disabled: false
    },
    {
      label: "Description",
      id: "description",
      type: "",
      disabled: false
    },
    {
      label: "Tool",
      id: "tool_identifier",
      type: "select",
      disabled: false
    },
    {
      label: "Tool Type",
      id: "tool_type_identifier",
      type: "select",
      disabled: true
    },  
    {
      label: "Compliance",
      id: "compliance",
      fields: ["name", "value"],
      disabled: true
    }, 

    {
      label: "Licensing",
      id: "licensing",
      fields: ["name", "value"],
      disabled: true
    },
    {
      label: "Tags",
      id: "tags",
      type: "tags",
      disabled: true
    },
    {
      label: "Location",
      id: "location",
      type: "multi",
      showEditButton: false,
      fields: ["name", "value"],
      disabled: true
    },

    {
      label: "Contacts",
      id: "contacts",
      type: "multi",
      showEditButton: true,
      fields: ["name", "email", "id"],
      disabled: true
    },
    {
      label: "Project",
      id: "projects",
      type: "multi",
      showEditButton: true,
      fields: ["name", "reference", "id"],
      disabled: true
    },
    {
      label: "Application",
      id: "applications",
      type: "multi",
      showEditButton: true,
      fields: ["name", "reference", "id"],
      disabled: true
    },
    {
      label: "Organization",
      id: "organization",
      type: "multi",
      showEditButton: true,
      fields: ["name", "reference", "id"],
      disabled: true
    },
    // {
    //   label: "External Reference",
    //   id: "external_reference",
    //   type: "multi",
    //   showEditButton: true,
    //   fields: ["name", "description", "identifier"],
    //   disabled: true
    // },
    {
      label: "",
      id: "active",
      value: true,
      type: "switch",
      disabled: false
    }
  ];

  const [ toolFormFields, setFormFields ] = useState(INITIAL_FORM);
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
      ...props.editTool.details
    });
  }, [props.editTool.details]);

  const getToolList = async () => {
    try {
      const accessToken = await getAccessToken();
      const toolResponse = await axiosApiService(accessToken).get("/registry/tools", {});
      const typeResponse = await axiosApiService(accessToken).get("/registry/types", {});
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
    console.log(toolFormFields);
    try {
      const accessToken = await getAccessToken();
      await axiosApiService(accessToken).post("/registry/"+ props.editTool.id + "/update", { ...toolFormFields });
      props.closeModal(false);
    }
    catch (err) {
      console.log(err.message);
    }
  };

  const handleClose = () => props.closeModal(false);

  // const handleLocationUpdate = (value, formField, type) => {
  //   setFormFields({ 
  //     ...toolFormFields, 
  //     [formField.id]: { [type]: value }
  //   });
  // };

  const handleToolTypeUpdate = (value, formField) => {
    let selectedToolType = tool_list.tool_identifier.find(function (o) { return o.identifier == value; });
    setFormFields({ 
      ...toolFormFields, 
      tool_type_identifier: selectedToolType.tool_type_identifier,
      [formField.id]: selectedToolType.identifier 
    });
  };

  const handleArrayUpdate = (value, formField) => {
    console.log(value);
    console.log(formField);
    setFormFields({ 
      ...toolFormFields, 
      [formField.id]: value
    });
  };

  const formFieldType = (formField) => {
    switch (formField.type) {
    case "switch":
      return <Form.Check 
        type="switch"
        id="custom-switch"
        checked={toolFormFields[formField.id]}
        label="Active"
        onChange={e => {
          setFormFields({ ...toolFormFields, [formField.id]: e.target.checked });
        }}
      />;
    case "textarea":
      return <Form.Control 
        as="textarea"
        rows={1}
        disabled={formField.disabled}
        onChange={e => setFormFields({ ...toolFormFields, [formField.id]: e.target.value })}
      />;     
    case "select":
      return <Form.Control as="select" disabled={formField.disabled} defaultValue={editTool[formField.id]} value={toolFormFields[formField.id]} placeholder="Please select" onChange={e => handleToolTypeUpdate(e.target.value, formField)}>
        {tool_list[formField.id].map((option, i) => (
          <option key={i} value={option.identifier}>{option.name}</option>
        ))} 
      </Form.Control>;
    case "tags":
      return (<Row>
        <Col><Form.Control placeholder="name" defaultValue={editTool[formField.id]} onChange={e => handleArrayUpdate(e.target.value, formField) } /> </Col>        
      </Row>
      );
    case "multi":
      return <MultiInputFormField formField={formField} defaultValue={editTool[formField.id]} onChange={data => setFormFields({ ...toolFormFields, [formField.id]: data })} />;      
    default:
      return  <Form.Control defaultValue={editTool[formField.id]} disabled={formField.disabled}  onChange={e => setFormFields({ ...toolFormFields, [formField.id]: e.target.value })} />;
    }
  };

  return (
    <>
      <Modal size="lg" show={props.showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.type == "new" ? "New" : "Edit"} Tool</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="newToolFormContainer">
            {formFields.map((formField, i) => {
              return(
                <Form.Group key={i} controlId="formPlaintextEmail" className="mt-2">
                  <Form.Label column sm="2">
                    {formField.label}
                  </Form.Label>
                  <Col sm="10">
                    {formFieldType(formField)}
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



export default NewTool;