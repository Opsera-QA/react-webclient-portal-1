import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Form, Popover, Col, OverlayTrigger } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import PropTypes from "prop-types";
import MultiInputFormField from "utils/multiInputFormField";
import TagInput from "utils/tagInput";
import validate from "utils/formValidation";
import newToolFormFields from "./new-tool-form-fields.js";
import Loading from "components/common/loading";

function NewTool(props) {
  const { getAccessToken } = useContext(AuthContext);
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ formFieldList, updateFormFields ] = useState({ ...newToolFormFields });
  const [ tool_list, setToolList ] = useState({
    tool_type_identifier: [], 
    tool_identifier: []
  });

  useEffect(() => {  
    Object.assign(formFieldList, newToolFormFields);
    getToolList();
    if(props.toolId) {
      setIsLoading(true);
      getToolDetails(props.toolId);
    }
  }, []);

  const getToolDetails = async (toolId) => {
    try {
      const accessToken = await getAccessToken();
      const toolDetails = await axiosApiService(accessToken).get("/registry/" + toolId, {});
      Object.keys(formFieldList).map((item, i) => {
        let validateInput = {
          isValid: true,
          value: toolDetails.data[0][item]
        };
        updateFormFields(prevState => ({ 
          ...prevState, 
          [item]: { 
            ...prevState[item],
            ...validateInput
          } 
        }));
      });
      setIsLoading(false);
    }
    catch (err) {
      setErrors(err.message);
      console.log(err.message);
      setIsLoading(false);
    }
  };

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
      setErrors(err.message);
      console.log(err.message);
    }
  };

  const createNewTool = async () => {
    let formData = Object.keys(formFieldList).reduce((obj, key) => {
      obj[key] = formFieldList[key].value;
      return obj;
    }, {});
    console.log("FORMDATA: ", formData);
    if(isFormValid) {
      try {
        const accessToken = await getAccessToken();
        //const response = await axiosApiService(accessToken).post("/registry/create", { ...formData });
        //console.log(response.data);
        //props.closeModal(false, response.data);
      }
      catch (err) {
        isNameValid();
      }
    }
  };

  const isNameValid = () => {
    let validateInput = {
      errorMessage: "Name already exists! Please use a different name.",
      touched: true, 
      isValid: false,
      value: ""
    };

    updateFormFields(prevState => ({ 
      ...prevState, 
      name: { 
        ...prevState["name"],
        ...validateInput
      } 
    }));
  };

  const updateTool = async () => {
    let formData = Object.keys(formFieldList).reduce((obj, key) => {
      obj[key] = formFieldList[key].value;
      return obj;
    }, {});

    try {
      const accessToken = await getAccessToken();
      const response = await axiosApiService(accessToken).post("/registry/"+ props.toolId + "/update", { ...formData });
      props.closeModal(false, response.data);
    }
    catch (err) {
      setErrors(err.message);
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

    let tool_type_identifier = {        
      isValid: true,
      touched: true,
      value: selectedToolType.tool_type_identifier 
    };

    let tool_identifier = {        
      isValid: true,
      touched: true,
      value: selectedToolType.identifier
    };

    updateFormFields(prevState => ({ 
      ...prevState, 
      tool_type_identifier: {
        ...prevState["tool_type_identifier"],
        ...tool_type_identifier
      },
      tool_identifier: { 
        ...prevState["tool_identifier"],
        ...tool_identifier
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
      return <Form.Control as="select" disabled={formField.disabled} value={formField.value} onChange={e => handleToolTypeUpdate(e.target.value, formField)}>
        <option name="Select One" value="" disabled={true}>Select One</option>
        {tool_list[formField.id].map((option, i) => (
          <option key={i} value={option.identifier}>{option.name}</option>
        ))} 
      </Form.Control>;
    case "tags":
      return <div className="pr-2 mr-1"><TagInput defaultValue={formField.value} onChange={data => handleFormChange(formField, data)} /></div>;
    case "multi":
      return <MultiInputFormField formField={formField} defaultValue={formField.value} onChange={data => handleFormChange(formField, data)} />;      
    default:
      return  <Form.Control value={formField.value} disabled={formField.disabled} isInvalid={formField.touched && !formField.isValid} onChange={e => handleFormChange(formField, e.target.value)} />;
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
      <Modal size="lg" show={props.showModal} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{props.type == "new" ? "New" : "Edit"} Tool</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="tool-content-block m-3 pt-2">

            {errors ? <div className="error-text">Error Reported: {errors}</div> : null}
            {isLoading ? <Loading size="sm" /> : null}
          
            {!isLoading && (
              <Form className="newToolFormContainer">
                {Object.values(formFieldList).map((formField, i) => {
                  //console.log("Form field: " + JSON.stringify(formField));
                  if(formField.toShow) {
                    return(
                      <Form.Group key={i} controlId="formPlaintextEmail" className="mt-2">
                        <Form.Label column sm="2">
                          {formField.label} 
                          {formField.rules.isRequired && <span style={{ marginLeft:5, color: "#dc3545" }}>*</span>}
                        </Form.Label>
                        <Col sm="10" className="text-right">
                          {formFieldType(formField)}
                          <Form.Control.Feedback type="invalid">{formField.errorMessage}</Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                    );
                  }
                })}
              </Form>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <OverlayTrigger trigger={["hover", "hover"]} placement="top" overlay={popover}>
            <Button size="sm" variant="secondary" onClick={handleClose}>Close</Button>
          </OverlayTrigger>
          <Button size="sm" variant="primary" onClick={props.type == "new" ? createNewTool : updateTool} disabled={!isFormValid}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


NewTool.propTypes = {
  showModal: PropTypes.bool,
  toolId:  PropTypes.string,
  editTool: PropTypes.object
};



export default NewTool;