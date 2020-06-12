import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Form, Popover, Col, OverlayTrigger } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import PropTypes from "prop-types";
import MultiInputFormField from "./multiInputFormField";
import TagInput from "utils/tagInput";
import validate from "utils/formValidation";

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
  const [ formFieldList, updateFormFields ] = useState([
    {
      label: "Name",
      id: "name",
      type: "",
      disabled: false,
      touched: false,
      valid: false,
      rules: {
        isRequired: true 
      }
    },
    {
      label: "Description",
      id: "description",
      type: "",
      disabled: false,
      touched: false,
      valid: false,
      rules: {
        isRequired: false 
      }
    },
    {
      label: "Tool",
      id: "tool_identifier",
      type: "select",
      disabled: false,
      touched: false,
      valid: false,
      rules: {
        isRequired: true 
      }
    },
    {
      label: "Tool Type",
      id: "tool_type_identifier",
      type: "select",
      disabled: true,
      touched: false,
      valid: false,
      rules: {
        isRequired: false 
      }
    },  
    {
      label: "Compliance",
      id: "compliance",
      fields: ["name", "value"],
      disabled: true,
      touched: false,
      valid: false,
      rules: {
        isRequired: false 
      }
    }, 

    {
      label: "Licensing",
      id: "licensing",
      fields: ["name", "value"],
      disabled: true,
      touched: false,
      valid: false,
      rules: {
        isRequired: false 
      }
    },
    {
      label: "Tags",
      id: "tags",
      type: "tags",
      disabled: true,
      touched: false,
      valid: false,
      rules: {
        isRequired: false 
      }
    },
    {
      label: "Location",
      id: "location",
      type: "multi",
      showEditButton: false,
      fields: ["name", "value"],
      disabled: true,
      touched: false,
      valid: false,
      rules: {
        isRequired: false 
      }
    },

    {
      label: "Contacts",
      id: "contacts",
      type: "multi",
      showEditButton: true,
      fields: ["name", "email", "id"],
      disabled: true,
      touched: false,
      valid: false,
      rules: {
        isRequired: false 
      }
    },
    {
      label: "Project",
      id: "projects",
      type: "multi",
      showEditButton: true,
      fields: ["name", "reference", "id"],
      disabled: true,
      touched: false,
      valid: false,
      rules: {
        isRequired: false 
      }
    },
    {
      label: "Application",
      id: "applications",
      type: "multi",
      showEditButton: true,
      fields: ["name", "reference", "id"],
      disabled: true,
      touched: false,
      valid: false,
      rules: {
        isRequired: false 
      }
    },
    {
      label: "Organization",
      id: "organization",
      type: "multi",
      showEditButton: true,
      fields: ["name", "reference", "id"],
      disabled: true,
      touched: false,
      valid: false,
      rules: {
        isRequired: false 
      }
    },
    // {
    //   label: "External Reference",
    //   id: "external_reference",
    //   type: "multi",
    //   showEditButton: true,
    //   fields: ["name", "description", "identifier"],
    //   disabled: true,
    //         rules: {
    //    isRequired: false 
    //  }
    // },
    {
      label: "",
      id: "active",
      value: true,
      type: "switch",
      disabled: false,
      touched: false,
      valid: false,
      rules: {
        isRequired: false 
      }
    }
  ]);

  const [ toolFormFields, setFormFields ] = useState(INITIAL_FORM);
  const [ tool_list, setToolList ] = useState({
    tool_type_identifier: [], 
    tool_identifier: []
  });
  const [ isFormValid, setFormValidity ] = useState(false);

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
      props.closeModal(false, response.data);
    }
    catch (err) {
      console.log(err.message);
    }
  };

  const updateTool = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axiosApiService(accessToken).post("/registry/"+ props.editTool.id + "/update", { ...toolFormFields });
      props.closeModal(false, response.data);
    }
    catch (err) {
      console.log(err.message);
    }
  };

  const handleFormChange = (formField, value) => {
    let index = formFieldList.indexOf(formField);
    if (formField.id == "name" && formField.rules.isRequired) {
      let { isValid, errorMessage } = validate(value, formField);
      formFieldList[index].touched = true;
      formFieldList[index].valid = isValid;
      setFormValidity(isValid ? true : false);
      updateFormFields([ ...formFieldList ]);
    }
    setFormFields({ 
      ...toolFormFields, 
      [formField.id]: value 
    });
  };

  const handleClose = () => props.closeModal(false);

  const handleToolTypeUpdate = (value, formField) => {
    let selectedToolType = tool_list.tool_identifier.find(function (o) { return o.identifier == value; });
    setFormFields({ 
      ...toolFormFields, 
      tool_type_identifier: selectedToolType.tool_type_identifier,
      [formField.id]: selectedToolType.identifier 
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
        placeholder="Please select"
        isInvalid={formField.valid}
        onChange={e => {
          handleFormChange(formField, e.target.checked);}
        }
      />;
    case "textarea":
      return <Form.Control 
        as="textarea"
        rows={1}
        disabled={formField.disabled}
        onChange={e => handleFormChange(formField, e.target.value)}
      />;     
    case "select":
      return <Form.Control as="select" disabled={formField.disabled} defaultValue={editTool[formField.id]} placeholder="Please select" onChange={e => handleToolTypeUpdate(e.target.value, formField)}>
        {tool_list[formField.id].map((option, i) => (
          <option key={i} value={option.identifier}>{option.name}</option>
        ))} 
      </Form.Control>;
    case "tags":
      return <TagInput defaultValue={editTool[formField.id]} onChange={data => handleFormChange(formField, data)} />;
    case "multi":
      return <MultiInputFormField formField={formField} defaultValue={editTool[formField.id]} onChange={data => handleFormChange(formField, data)} />;      
    default:
      return  <Form.Control defaultValue={editTool[formField.id]} disabled={formField.disabled} isInvalid={formField.touched && !formField.valid} onChange={e => handleFormChange(formField, e.target.value)} />;
    }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
        All unsaved changes will be lost
      </Popover.Content>
    </Popover>
  );

  return (
    <>
      <Modal size="lg" show={props.showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.type == "new" ? "New" : "Edit"} Tool</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="newToolFormContainer">
            {formFieldList.map((formField, i) => {
              return(
                <Form.Group key={i} controlId="formPlaintextEmail" className="mt-2">
                  <Form.Label column sm="2">
                    {formField.label} 
                    {formField.rules.isRequired && <span style={{ marginLeft:5, color: "#dc3545" }}>*</span>}
                  </Form.Label>
                  <Col sm="10">
                    {formFieldType(formField)}
                    <Form.Control.Feedback type="invalid">this field is required</Form.Control.Feedback>
                  </Col>
                </Form.Group>
              );
            })}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <OverlayTrigger trigger="hover" placement="top" overlay={popover}>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </OverlayTrigger>
          <Button variant="primary" onClick={props.type == "new" ? createNewTool : updateTool} disabled={!isFormValid}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}



export default NewTool;