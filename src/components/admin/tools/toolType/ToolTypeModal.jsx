import React, { useState, useEffect, useContext, useMemo } from "react";
import { Button, Modal, Form, Popover, Col, OverlayTrigger, ButtonToolbar, ButtonGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

import MultiInputFormField from "utils/multiInputFormField";
import TagInput from "utils/tagInput";
import validate from "utils/formValidation";
import toolTypeFormFields from "./tool-type-form-fields.js";

import ViewToolType from "./ViewToolType";

function ToolTypeModal(props) {
  const { getAccessToken } = useContext(AuthContext);
  const [toolData, setToolData] = useState({});
  const [toolType, setToolType] = useState("View");
  const [formFieldList, updateFormFields ] = useState({ ...toolTypeFormFields });
  const [canDelete, setCanDelete] = useState(true);


  useEffect(() => {  
    setToolType(props.type);
    setToolData(props.toolData);
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
        defaultValue={formField.value}
        disabled={formField.disabled}
        onChange={e => handleFormChange(formField, e.target.value)}
      />;     
    case "tags":
      return <TagInput defaultValue={formField.value} onChange={data => handleFormChange(formField, data)} />;
    case "multi":
      return <MultiInputFormField formField={formField} defaultValue={formField.value} onChange={data => handleFormChange(formField, data)} />;      
    default:
      return  <Form.Control value={formField.value} disabled={formField.disabled} isInvalid={formField.touched && !formField.isValid} onChange={e => handleFormChange(formField, e.target.value)} />;
    }
  };

  const isFormValid = (formFieldList.name.value && formFieldList.identifier.value) ? true :false;

  const createToolType = async () => {
    let formData = Object.keys(formFieldList).reduce((obj, key) => {
      obj[key] = formFieldList[key].value;
      return obj;
    }, {});
    if(isFormValid) {
      try {
        const accessToken = await getAccessToken();
        const response = await axiosApiService(accessToken).post("/registry/type/create", { ...formData });
        setToolData(response.data);
        setToolType("View");
      }
      catch (err) {
        console.log(err.message);
      }
    }
  };

  const updateToolType = async () => {
    let formData = Object.keys(formFieldList).reduce((obj, key) => {
      obj[key] = formFieldList[key].value;
      return obj;
    }, {});

    try {
      const accessToken = await getAccessToken();
      const response = await axiosApiService(accessToken).post("/registry/type/"+ toolData._id + "/update", { ...formData });
      setToolData(response.data);
      setToolType("View");
    }
    catch (err) {
      console.log(err.message);
    }
  };

  const saveChanges = () => {
    if(toolType == "New"){ createToolType(); }
    else{ updateToolType(); }
  };

  const editTool = () => {
    Object.keys(formFieldList).map((item, i) => {
      let validateInput = {
        value: toolData[item]
      };
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
      const response = await axiosApiService(accessToken).delete("/registry/type/"+ toolData._id, { });
      console.log(response.data);
      props.closeModal(false);
    }
    catch (err) {
      console.log(err.message);
    }
  };
  
  return (
    <Modal size="lg" id="dataManagerModalSmall" show={props.showModal} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{toolType} Tool Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <ButtonToolbar className="justify-content-between my-2 ml-2 mr-2">
            <ButtonGroup>
              <Button size="sm" className="ml-2 mr-2" variant={toolType === "View" ? "primary" : "secondary"} onClick={() => setToolType("View")}>Summary</Button>
              <Button size="sm" className="mr-2" variant={toolType === "Edit" ? "primary" : "secondary"} onClick= {() => { editTool(); }} >
                <FontAwesomeIcon icon={faPen} fixedWidth /> Edit Tool Type
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button size="sm" disabled={!canDelete || toolType !== "View"} className="pull-right mr-2" variant={canDelete ? "danger" : "secondary"} onClick= {() => { props.handleDeleteClick("toolType"); }} >
                <FontAwesomeIcon icon={faTrash} fixedWidth /> Delete Tool Type
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>

        {toolType === "View" && <ViewToolType toolData={toolData} toolId={props.toolId} />}

        {(toolType === "New" || toolType === "Edit") && (
          // TODO: Create New/Edit tool type component and manually place everything
          <div className="tool-content-block m-3 pt-2">
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
          </div>

        )}

      </Modal.Body>
      <Modal.Footer>
        <OverlayTrigger trigger={["hover", "hover"]} placement="top" overlay={popover}>
          <Button variant="secondary" size="sm" onClick={handleClose}>Close</Button>
        </OverlayTrigger>
        {(toolType === "New" || toolType === "Edit") && <Button size="sm" variant="primary" onClick={saveChanges} disabled={!isFormValid}>Save changes</Button>}
      </Modal.Footer>
    </Modal>
  );
}

ToolTypeModal.propTypes = {
  showModal: PropTypes.bool,
  type: PropTypes.string,
  toolId: PropTypes.string,
  toolData: PropTypes.object,
  closeModal: PropTypes.func,
  handleDeleteClick: PropTypes.func
};

export default ToolTypeModal;


