import React, { useState, useEffect, useContext } from "react";
import { Button, Modal, Form, Popover, Col, OverlayTrigger } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

import MultiInputFormField from "utils/multiInputFormField";
import validate from "utils/formValidation";
import templateEditorFormFields from "./template-form-fields.js";

import ViewTemplate from "./ViewTemplate";

function TemplateEditorModal(props) {
  const { getAccessToken } = useContext(AuthContext);
  const [templateData, setTemplateData] = useState({});
  const [templateType, setTemplateType] = useState("View");
  const [formFieldList, updateFormFields ] = useState({ ...templateEditorFormFields });


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

    //Even if user deletes the default value set default before submitting the form data for configuration
    let newConfiguration = formFieldList.configuration.value;

    if(newConfiguration.length == 0) {
      formFieldList.configuration.value = { "type": "" };
    }else {
      //Convert array of objects to object
      formFieldList.configuration.value = newConfiguration.reduce((obj, item) => Object.assign(obj, { [item.name]: item.value }), {});
    }

    //Only extract the value filed before sending to the API
    let formData = Object.keys(formFieldList).reduce((obj, item) => Object.assign(obj, { [item]: formFieldList[item].value }), {});
    console.log(formData);
    let API_URL = templateType == "New" ? "/templates/create" : "/templates/" + templateData._id + "/update";

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

  const editTag = () => {
    //Format the API response for the form
    Object.keys(formFieldList).map((item, i) => {
      let validateInput = {};

      //For configutation, convet the object to array
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
  
  return (
    <Modal size="lg" show={props.showModal} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{templateType} Tempalte</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        {templateType == "View" &&  <div className="text-right">
          {/* <Button variant="primary" size="sm" onClick= {() => { editTag(); }} className="mr-2">
            <FontAwesomeIcon icon={faPen}
              fixedWidth
              style={{ cursor: "pointer" }} /> </Button> */}
          <Button variant="danger" size="sm" onClick= {() => { deleteTemplate(); }} >
            <FontAwesomeIcon icon={faTrash}
              fixedWidth
              style={{ cursor: "pointer" }} /> </Button>
        </div>} 

        {templateType == "View" && <ViewTemplate templateData={templateData} templateId={props.templateId} />}

        {(templateType == "New" || templateType == "Edit") && (
          <Form className="newTemplateFormContainer">
            {Object.values(formFieldList).map((formField, i) => {
              if(formField.toShow) {
                return(
                  <Form.Group key={i} controlId="formPlaintextEmail" className="mt-2">
                    <Form.Label column sm="2">
                      {formField.label} 
                      {formField.rules.isRequired && <span style={{ marginLeft:5, color: "#dc3545" }}>*</span>}
                    </Form.Label>
                    <Col sm="10">
                      {formFieldType(formField)}
                      <Form.Control.Feedback type="invalid">{formField.errorMessage}</Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                );
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


