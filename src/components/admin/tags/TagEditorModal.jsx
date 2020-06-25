import React, { useState, useEffect, useContext } from "react";
import { Button, Modal, Form, Popover, Col, OverlayTrigger } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

import MultiInputFormField from "utils/multiInputFormField";
import validate from "utils/formValidation";
import tagEditorFormFields from "./tags-form-fields.js";

import ViewToolType from "./ViewTags";

function TagsEditorModal(props) {
  const { getAccessToken } = useContext(AuthContext);
  const [tagData, setToolData] = useState({});
  const [tagType, setToolType] = useState("View");
  const [formFieldList, updateFormFields ] = useState({ ...tagEditorFormFields });


  useEffect(() => {  
    setToolType(props.type);
    setToolData(props.tagData);
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

  const isFormValid = (formFieldList.key.value && formFieldList.value.value) ? true :false;

  //Use a single function for create and update tag
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
    let API_URL = tagType == "New" ? "/tags/create" : "/tags/" + tagData._id + "/update";

    if(isFormValid) {
      try {
        const accessToken = await getAccessToken();
        const response = await axiosApiService(
          accessToken
        ).post(API_URL, { ...formData });
        setToolData(response.data);
        setToolType("View");
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
        Object.keys(tagData[item]).map((data) => {
          formatConfiguration.push({
            name: [data],
            value: tagData[item][data]
          });
        });
        validateInput = {
          value: formatConfiguration
        };
      }else {
        validateInput = {
          value: tagData[item]
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

    setToolType("Edit");
  };


  const deleteTool = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axiosApiService(accessToken).delete("/tags/"+ tagData._id, { });
      console.log(response.data);
      props.closeModal(false);
    }
    catch (err) {
      console.log(err.message);
    }
  };
  
  return (
    <Modal size="lg" show={props.showModal} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{tagType} Tag</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        {tagType == "View" &&  <div className="text-right">
          <Button variant="primary" size="sm" onClick= {() => { editTag(); }} className="mr-2">
            <FontAwesomeIcon icon={faPen}
              fixedWidth
              style={{ cursor: "pointer" }} /> </Button>
          <Button variant="danger" size="sm" onClick= {() => { deleteTool(); }} >
            <FontAwesomeIcon icon={faTrash}
              fixedWidth
              style={{ cursor: "pointer" }} /> </Button>
        </div>}

        {tagType == "View" && <ViewToolType tagData={tagData} tagId={props.tagId} />}

        {(tagType == "New" || tagType == "Edit") && (
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
        {(tagType == "New" || tagType == "Edit") && <Button variant="primary" onClick={updateTag} disabled={!isFormValid}>Save changes</Button>}
      </Modal.Footer>
    </Modal>
  );
}

TagsEditorModal.propTypes = {
  showModal: PropTypes.bool,
  type: PropTypes.string,
  tagId: PropTypes.string,
  tagData: PropTypes.object,
  closeModal: PropTypes.func
};

export default TagsEditorModal;


