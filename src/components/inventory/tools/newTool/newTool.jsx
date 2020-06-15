import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Form, Popover, Col, OverlayTrigger } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import PropTypes from "prop-types";
import MultiInputFormField from "./multiInputFormField";
import TagInput from "utils/tagInput";
import validate from "utils/formValidation";
import newToolFormFields from "./new-tool-form-fields.js";
import { ApiService } from "api/apiService";

function NewTool(props) {
  const { getAccessToken } = useContext(AuthContext);
  const [ formFieldList, updateFormFields ] = useState({ ...newToolFormFields });
  const [ tool_list, setToolList ] = useState({
    tool_type_identifier: [], 
    tool_identifier: []
  });
  let editFormValues = props.editTool.details;

  useEffect(() => {  
    Object.assign(formFieldList, newToolFormFields);
    getToolList();
  }, []);

  useEffect(() => {  
    if(props.type == "edit") {
      Object.keys(formFieldList).map((item, i) => {
        let validateInput = {
          isValid: true,
          value: editFormValues[item]
        };
        updateFormFields(prevState => ({ 
          ...prevState, 
          [item]: { 
            ...prevState[item],
            ...validateInput
          } 
        }));
        updateFormFields({ 
          ...formFieldList
        });
      }); 
    }else {
      console.log(newToolFormFields);
    }
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
    let formData = Object.keys(formFieldList).reduce((obj, key) => {
      obj[key] = formFieldList[key].value;
      return obj;
    }, {});
    if(isFormValid) {
      try {
        const accessToken = await getAccessToken();
        const response = await axiosApiService(accessToken).post("/registry/create", { ...formData });
        console.log(response.data);
        props.closeModal(false, response.data);
      }
      catch (err) {
        console.log(err.message);
      }
    }
  };

  //Check if the name is already registered in the system
  const isNameAvailable = async () => {
    const apiCall = new ApiService("/users/check-tool-name", {}, null, {  });
    await apiCall.post()
      .then(function (response) {
        if (response.data) {
          updateFormFields(prevState => ({ 
            ...prevState, 
            name: { 
              ...prevState.name,
              isValid: false,
              errorMessage: "Name already exists in our system!  Try logging in with a new name."
            } 
          }));
        }
      })
      .catch(function (error) {
        console.error(error);
        return true;
      });
  };

  const updateTool = async () => {
    let formData = Object.keys(formFieldList).reduce((obj, key) => {
      obj[key] = formFieldList[key].value;
      return obj;
    }, {});

    try {
      const accessToken = await getAccessToken();
      const response = await axiosApiService(accessToken).post("/registry/"+ props.editTool.id + "/update", { ...formData });
      props.closeModal(false, response.data);
    }
    catch (err) {
      console.log(err.message);
    }
  };

  const handleFormChange = (formField, value) => {
    
    let validateInput = {
      errorMessage: "",
      touched: true, 
      isValid: true,
      value: value
    };
  
    if (formField.id == "name" && formField.rules.isRequired) {
      let { isValid, errorMessage } = validate(value, formField);
      validateInput.isValid = isValid;
      validateInput.errorMessage = errorMessage;
    }

    updateFormFields(prevState => ({ 
      ...prevState, 
      [formField.id]: { 
        ...prevState[formField.id],
        ...validateInput
      } 
    }));

  };

  const handleClose = () => {
    props.closeModal(false);
  };

  const handleToolTypeUpdate = (value, formField) => {
    let selectedToolType = tool_list.tool_identifier.find(function (o) { return o.identifier == value; });
    console.log(selectedToolType);
    updateFormFields(prevState => ({ 
      ...prevState, 
      tool_type_identifier: {
        ...prevState["tool_type_identifier"],
        isValid: true,
        touched: true,
        value: selectedToolType.tool_type_identifier
      },
      tool_identifier: { 
        ...prevState["tool_identifier"],
        isValid: true,
        touched: true,
        value: selectedToolType.identifier 
      } 
    }));
  };

  const isFormValid = (formFieldList.name.value && formFieldList.tool_identifier.value) ? true :false;
  const isFormModified = Object.values(formFieldList).some(x => (x.touched == true));

  const formFieldType = (formField) => {
    switch (formField.type) {
    case "switch":
      return <Form.Check 
        type="switch"
        id="custom-switch"
        checked={formFieldList[formField.id].value ? true : false}   
        label="Active"
        placeholder="Please select"
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
      return <Form.Control as="select" disabled={formField.disabled} defaultValue={editFormValues[formField.id]} onChange={e => handleToolTypeUpdate(e.target.value, formField)}>
        {tool_list[formField.id].map((option, i) => (
          <option key={i} value={option.identifier}>{option.name}</option>
        ))} 
      </Form.Control>;
    case "tags":
      return <TagInput defaultValue={editFormValues[formField.id]} onChange={data => handleFormChange(formField, data)} />;
    case "multi":
      return <MultiInputFormField formField={formField} defaultValue={editFormValues[formField.id]} onChange={data => handleFormChange(formField, data)} />;      
    default:
      return  <Form.Control defaultValue={editFormValues[formField.id]} disabled={formField.disabled} isInvalid={formField.touched && !formField.isValid} onChange={e => handleFormChange(formField, e.target.value)} />;
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
            {Object.values(formFieldList).map((formField, i) => {
              if(formField.toShow) {
                return(
                  <Form.Group key={i} controlId="formPlaintextEmail" className="mt-2">
                    <Form.Label column sm="2">
                      {formField.label} 
                      {formField.rules.isRequired && <span style={{ marginLeft:5, color: "#dc3545" }}>*</span>}
                    </Form.Label>
                    <Col sm="10">
                      {JSON.stringify(formField.touched)}
                      {formFieldType(formField)}
                      <Form.Control.Feedback type="invalid">{formField.errorMessage}</Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                );
              }
            })}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <OverlayTrigger trigger={["hover", "hover"]} placement="top" overlay={popover}>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </OverlayTrigger>
          <Button variant="primary" onClick={props.type == "new" ? createNewTool : updateTool} disabled={!isFormValid}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


NewTool.propTypes = {
  showModal: PropTypes.bool,
  type:  PropTypes.string,
  editTool: PropTypes.object
};



export default NewTool;