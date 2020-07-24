import React, { useState, useEffect } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { axiosApiService } from "api/apiService";
import PropTypes from "prop-types";
import MultiInputFormField from "utils/multiInputFormField";
import TagInput from "utils/tagInput";
import validate from "utils/formValidation";
import newToolFormFields from "./new-tool-form-fields.js";
import Loading from "components/common/loading";
import { capitalizeFirstLetter } from "../../../common/helpers/string-helpers";
import DropdownList from "react-widgets/lib/DropdownList";

function ToolPropertiesForm(props) {
  const { type, accessToken, toolId, setActiveTab, getToolRegistryItem, setToolId, closeModal } = props;  
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
    if(toolId) {
      setIsLoading(true);
      getToolDetails(toolId);
    } 
  }, []);

  const getToolDetails = async (toolId) => {
    try {
      
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
    if(isFormValid) {
      try {
        const response = await axiosApiService(accessToken).post("/registry/create", { ...formData });
        setToolId(response.data._id);
        getToolRegistryItem(response.data._id);
        setActiveTab("summary");
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
      await axiosApiService(accessToken).post("/registry/"+ toolId + "/update", { ...formData });
      getToolRegistryItem(toolId);
      setActiveTab("summary");
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

  const handleToolTypeUpdate = (selectedToolType) => {
    console.log(JSON.stringify(selectedToolType));

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

    console.log("Tool_Type_Identifier: " + JSON.stringify(tool_type_identifier));
    console.log("tool_identifier: " + JSON.stringify(tool_identifier));

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

  const handleCancel = (toolId, type) => {
    if (type === "new") {
      closeModal(false);
    } else {
      getToolRegistryItem(toolId);
      setActiveTab("summary");
    }
  };

  const isFormValid = (formFieldList.name.value && formFieldList.tool_identifier.value) ? true :false;
  //const isFormModified = Object.values(formFieldList).some(x => (x.touched == true));

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
      const toolIndex = tool_list.tool_identifier.findIndex(x => x.identifier === formField.value);
      console.log("tool index: " + toolIndex);
      return <DropdownList
        data={tool_list.tool_identifier}
        valueField='tool_identifier'
        value={ toolIndex !== -1 ? tool_list.tool_identifier[toolIndex] : null}
        busy={(!formField.active) ? false : Object.keys(tool_list).tool_identifier.length == 0 ? true : false}
        disabled={formField.disabled}
        textField='name'
        filter='contains'
        groupBy={tool => capitalizeFirstLetter(tool.tool_type_identifier, "-", "No Tool Type Identifier")}
        onChange={handleToolTypeUpdate} />;
    case "tags":
      return <div className="pr-2 mr-1"><TagInput defaultValue={formField.value} onChange={data => handleFormChange(formField, data)} /></div>;
    case "multi":
      return <MultiInputFormField formField={formField} defaultValue={formField.value} onChange={data => handleFormChange(formField, data)} />;      
    default:
      return  <Form.Control value={formField.value} disabled={formField.disabled} isInvalid={formField.touched && !formField.isValid} onChange={e => handleFormChange(formField, e.target.value)} />;
    }
  };

  // TODO: Convert to static form
  return (
    <>
      <div className="tool-content-block m-3 pt-2">

        {errors && <div className="error-text">Error Reported: {errors}</div>}
        {isLoading ? <Loading size="sm" /> : null}
          
        {!isLoading && <>
          <Form className="newToolFormContainer">
            {Object.values(formFieldList).map((formField, i) => {
              
              if(formField.toShow) {
                return(
                  <Form.Group key={i} controlId="formPlaintextEmail" className="mt-2 vertical-center-cols-in-row">
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
          <div className="text-right m-2">
            <Button size="sm" variant="primary" onClick={type == "new" ? createNewTool : updateTool} disabled={!isFormValid}>Save changes</Button>
            <Button size="sm" className="ml-1" variant="secondary" onClick={() => handleCancel(toolId, type)}>Cancel</Button>
          </div>
        </>}
      </div>
    </>
  );
}


ToolPropertiesForm.propTypes = {
  type: PropTypes.string,
  toolId:  PropTypes.string,
  accessToken: PropTypes.string,
  setActiveTab: PropTypes.func,
  getToolRegistryItem: PropTypes.func,
  toolData: PropTypes.object,
  setToolId: PropTypes.func,
  closeModal: PropTypes.func
};



export default ToolPropertiesForm;