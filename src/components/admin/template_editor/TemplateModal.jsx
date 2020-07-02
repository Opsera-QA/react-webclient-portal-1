import React, { useState, useEffect, useContext } from "react";
import { Button, Modal, Form, Popover, Col, OverlayTrigger } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import TagInput from "utils/tagInput";
import MultiInputFormField from "utils/multiInputFormField";
import validate from "utils/formValidation";
import templateEditorFormFields from "./template-form-fields.js";
import JSONInput from "react-json-editor-ajrm";
import locale    from "react-json-editor-ajrm/locale/en";
import ViewTemplate from "./ViewTemplate";

import "./template_editor.css";

function TemplateEditorModal(props) {
  const { getAccessToken } = useContext(AuthContext);
  const [templateData, setTemplateData] = useState({});
  const [templateType, setTemplateType] = useState("View");
  const [formFieldList, updateFormFields ] = useState({ ...templateEditorFormFields });
  const [ planData, setPlanData] = useState([]);

  const defaultForm = {
    "type": [],
    "tags": [],
    "name": "Blank Pipeline Template",
    "description": "Create a new template from scratch.",
    "active": true,
    "roles": ["opsera", "everyone"],
    "plan": [
      {
        "tool": {},
        "trigger": [],
        "type": [],
        "notification": [],
        "name": "",
        "description": "",
        "active": true
      }
    ]
  };

  useEffect(() => {  
    setTemplateType(props.type);
    setTemplateData(props.templateData);
  }, []);

  const handleClose = () => {
    props.closeModal(false);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
        All unsaved changes will be lost
      </Popover.Content>
    </Popover>
  );

  const handleFormChange = (formField, value) => {
    
    let validateInput = {
      errorMessage: "",
      touched: true, 
      isValid: true,
      value: value
    };
  
    if (formField.rules.isRequired) {
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

  const formFieldType = formField => {
    switch (formField.type) {
    case "switch":
      return (
        <Form.Check
          type="switch"
          id="custom-switch"
          checked={formFieldList[formField.id].value ? true : false}
          label="Active"
          placeholder="Please select"
          onChange={e => {
            handleFormChange(formField, e.target.checked);
          }}
        />
      );
    case "multi":
      return (
        <MultiInputFormField
          formField={formField}
          defaultValue={formField.value}
          onChange={data => handleFormChange(formField, data)}
        />
      );
    case "tags":
      return <TagInput defaultValue={formField.value} onChange={data => handleFormChange(formField, data)} />;      
    case "JSON": 
      return  <JSONInput
        placeholder={formField.value}
        onChange={e => handleJsonInputUpdate(e) }
        theme="light_mitsuketa_tribute"
        locale={locale}
        height="300px"
        width= "100%"
      />; 
    default:
      return (
        <Form.Control
          value={formField.value}
          disabled={formField.disabled}
          isInvalid={formField.touched && !formField.isValid}
          onChange={e => handleFormChange(formField, e.target.value)}
        />
      );
    }
  };

  const isFormValid = (formFieldList.name.value && formFieldList.description.value) ? true :false;

  //Use a single function for create and update template
  const updateTag = async () => {

    //Check if role data is empty. If yes, add default
    formFieldList.roles.value = formFieldList.roles.value.length == 0 ? defaultForm.roles : formFieldList.roles.value;

    //Check if plan data is empty
    formFieldList.plan.value = planData.length == 0 ? defaultForm.plan : validateDefaults(planData);

    //Only extract the value filed before sending to the API
    let formData = Object.keys(formFieldList).reduce((obj, item) => Object.assign(obj, { [item]: formFieldList[item].value }), {});
    console.log(formData);

    let API_URL = templateType == "New" ? "/pipelines/workflows/create" : "/pipelines/workflows/" + templateData._id + "/update";

    if(isFormValid) {
      try {
        const accessToken = await getAccessToken();
        const response = await axiosApiService(
          accessToken
        ).post(API_URL, { ...formData });
        setTemplateData(response.data);
        setTemplateType("View");
      }
      catch (err) {
        console.log(err.message);
      }
    }
  };

  //Check if all the default keys are present before submit
  const validateDefaults = (data) => {
    let planList = data;
    let defaultPlan = defaultForm.plan[0];
    planList.map((planData) => {
      Object.keys(defaultPlan).map((item) => {
        return planData.hasOwnProperty(item) ? item : planData[item] = defaultPlan[item];
      });
    });
    return planList;
  };

  const editTag = () => {
    //Format the API response for the form
    Object.keys(formFieldList).map((item, i) => {
      let validateInput = {};

      //For configuration, convert the object to array
      if(item == "configuration") {
        let formatConfiguration = [];
        Object.keys(templateData[item]).map((data) => {
          formatConfiguration.push({
            name: [data],
            value: templateData[item][data]
          });
        });
        validateInput = {
          value: formatConfiguration
        };
      }else {
        validateInput = {
          value: templateData[item]
        };
      }
      updateFormFields(prevState => ({ 
        ...prevState, 
        [item]: { 
          ...prevState[item],
          ...validateInput
        } 
      }));
    });

    setTemplateType("Edit");
  };


  const deleteTemplate = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axiosApiService(accessToken).delete("/pipelines/workflows/"+ templateData._id, { });
      props.closeModal(false);
    }
    catch (err) {
      console.log(err.message);
    }
  };

  const renderTemplateFormFields = (formField, i) => {
    return(
      <Form.Group key={i} controlId="formPlaintextEmail" className={formField.id == "plan" ? "mt-2 full-width" : "mt-2 half-width"}>
        <Form.Label column sm={formField.id == "plan" ? "1" : "2"}>
          {formField.label} 
          {formField.rules.isRequired && <span style={{ marginLeft:5, color: "#dc3545" }}>*</span>}
        </Form.Label>
        <Col sm={formField.id == "plan" ? "11" : "10"}>
          {formFieldType(formField)}
          <Form.Control.Feedback type="invalid">{formField.errorMessage}</Form.Control.Feedback>
        </Col>
      </Form.Group>
    );
  };

  const handleJsonInputUpdate = (e) => {
    setPlanData(JSON.parse(e.json));
  };
  
  return (
    <Modal size="lg" show={props.showModal} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{templateType} Tempalte</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>

        {templateType == "View" &&  <div className="text-right">
          <Button variant="primary" size="sm" onClick= {() => { editTag(); }} className="mr-2">
            <FontAwesomeIcon icon={faPen}
              fixedWidth
              style={{ cursor: "pointer" }} /> </Button> 
          <Button variant="danger" size="sm" onClick= {() => { deleteTemplate(); }} >
            <FontAwesomeIcon icon={faTrash}
              fixedWidth
              style={{ cursor: "pointer" }} /> </Button>
        </div>} 

        {templateType == "View" && <ViewTemplate templateData={templateData} templateId={props.templateId} />}

        {(templateType == "New" || templateType == "Edit") && (
          <Form className="templateFormContainer">
            {Object.values(formFieldList).map((formField, i) => {
              if(formField.toShow) {
                return renderTemplateFormFields(formField, i);
              }
            })}    
          </Form>
        )}

      </Modal.Body>
      <Modal.Footer>
        <OverlayTrigger trigger={["hover", "hover"]} placement="top" overlay={popover}>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </OverlayTrigger>
        {(templateType == "New" || templateType == "Edit") && <Button variant="primary" onClick={updateTag} disabled={!isFormValid}>Save changes</Button>}
      </Modal.Footer>
    </Modal>
  );
}

TemplateEditorModal.propTypes = {
  showModal: PropTypes.bool,
  type: PropTypes.string,
  templateId: PropTypes.string,
  templateData: PropTypes.object,
  closeModal: PropTypes.func
};

export default TemplateEditorModal;


