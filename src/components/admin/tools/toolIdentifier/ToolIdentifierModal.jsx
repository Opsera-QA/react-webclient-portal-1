import React, { useState, useEffect, useContext, useMemo } from "react";
import {
  Button,
  Modal,
  Form,
  Popover,
  Col,
  OverlayTrigger
} from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

import MultiInputFormField from "utils/multiInputFormField";
import MultiCheckboxFormField from "utils/multiCheckboxFormField";

import TagInput from "utils/tagInput";
import validate from "utils/formValidation";
import toolIdentifierFormFields from "./tool-identifier-form-fields.js";

import ViewToolIdentifier from "./ViewToolIdentifier";

function ToolIdentifierModal(props) {
  const { getAccessToken } = useContext(AuthContext);
  const [toolData, setToolData] = useState(props.toolData);
  const [toolType, setToolType] = useState(props.type);
  const [formFieldList, updateFormFields] = useState({
    ...toolIdentifierFormFields
  });
  const [tool_list, setToolList] = useState([]);

  useEffect(() => {
    getToolList();
  }, []);

  const handleClose = () => {
    props.closeModal(false);
  };

  const getToolList = async () => {
    try {
      const accessToken = await getAccessToken();
      const toolResponse = await axiosApiService(accessToken).get(
        "/registry/types",
        {}
      );
      setToolList(toolResponse.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>All unsaved changes will be lost</Popover.Content>
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

  const handleMultiCheckbox = (formField, item, value) => {
    let updateProperty = {
      [item]: value
    };

    updateFormFields(prevState => ({
      ...prevState,
      [formField.id]: {
        ...prevState[formField.id],
        value: {
          ...prevState[formField.id].value,
          ...updateProperty
        }
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
    case "multi-input":
      return (
        <>
          {Object.keys(formFieldList[formField.id].value).map((item, i) => (
            <Form.Check
              key={i}
              type="checkbox"
              id="custom-switch"
              checked={formFieldList[formField.id].value[item] ? true : false}
              label={item}
              placeholder="Please select"
              onChange={e => {
                handleMultiCheckbox(formField, item, e.target.checked);
              }}
            />
          ))}
        </>
      );
    case "textarea":
      return (
        <Form.Control
          as="textarea"
          rows={1}
          defaultValue={formField.value}
          disabled={formField.disabled}
          onChange={e => handleFormChange(formField, e.target.value)}
        />
      );
    case "select":
      return (
        <Form.Control
          as="select"
          disabled={formField.disabled}
          value={formField.value}
          onChange={e => handleFormChange(formField, e.target.value)}
        >
          {tool_list.map((option, i) => (
            <option key={i} value={option.identifier}>
              {option.name}
            </option>
          ))}
        </Form.Control>
      );
    case "tags":
      return (
        <TagInput
          defaultValue={formField.value}
          onChange={data => handleFormChange(formField, data)}
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
    case "multi-checkbox":
      return (
        <MultiCheckboxFormField
          isEditMode={toolType == "Edit" ? true : false}
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

  const isFormValid =
    formFieldList.name.value && formFieldList.identifier.value ? true : false;

  const updateToolIdentifier = async () => {

    //Even if use deletes the default value set default before submitting the form data
    let newProperties = formFieldList.properties.value;
    if(Object.keys(newProperties).length == 0) {
      formFieldList.properties.value = { isLiveStream: false };
    }else {
      formFieldList.properties.value = newProperties.reduce((obj, item) => Object.assign(obj, { [item.name]: item.value ? true : false }), {});
    }
    
    //Only extract the value filed before sending to the API
    let formData = Object.keys(formFieldList).reduce((obj, item) => Object.assign(obj, { [item]: formFieldList[item].value }), {});

    let API_URL = toolType == "New" ? "/registry/tool/create" : "/registry/tool/" + toolData._id + "/update";

    try {
      const accessToken = await getAccessToken();
      const response = await axiosApiService(
        accessToken
      ).post(API_URL, { ...formData });
      setToolData(response.data);
      setToolType("View");
    } catch (err) {
      console.log(err.message);
    }
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
      const response = await axiosApiService(accessToken).delete("/registry/tool/"+ toolData._id, { });
      console.log(response.data);
      props.closeModal(false);
    }
    catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Modal
      size="lg"
      show={props.showModal}
      onHide={handleClose}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>{toolType} Tool Identifier</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {toolType == "View" &&  <div className="text-right">
          <Button variant="primary" size="sm" onClick= {() => { editTool(); }} className="mr-2">
            <FontAwesomeIcon icon={faPen}
              fixedWidth
              style={{ cursor: "pointer" }} /> </Button>
          <Button variant="danger" size="sm" onClick= {() => { deleteTool(); }} >
            <FontAwesomeIcon icon={faTrash}
              fixedWidth
              style={{ cursor: "pointer" }} /> </Button>
        </div>}

        {toolType == "View" && (
          <ViewToolIdentifier toolData={toolData} toolId={props.toolId} />
        )}

        {(toolType == "New" || toolType == "Edit") && (
          <Form className="newToolFormContainer">
            {Object.values(formFieldList).map((formField, i) => {
              if (formField.toShow) {
                return (
                  <Form.Group
                    key={i}
                    controlId="formPlaintextEmail"
                    className="mt-2"
                  >
                    <Form.Label column sm="2">
                      {formField.label}
                      {formField.rules.isRequired && (
                        <span style={{ marginLeft: 5, color: "#dc3545" }}>
                          *
                        </span>
                      )}
                    </Form.Label>
                    <Col sm="10">
                      {formFieldType(formField)}
                      <Form.Control.Feedback type="invalid">
                        {formField.errorMessage}
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                );
              }
            })}
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <OverlayTrigger
          trigger={["hover", "hover"]}
          placement="top"
          overlay={popover}
        >
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </OverlayTrigger>
        {(toolType == "New" || toolType == "Edit") && (
          <Button
            variant="primary"
            onClick={updateToolIdentifier}
            disabled={!isFormValid}
          >
            Save changes
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

ToolIdentifierModal.propTypes = {
  showModal: PropTypes.bool,
  type: PropTypes.string,
  toolId: PropTypes.string,
  toolData: PropTypes.object,
  closeModal: PropTypes.func
};

export default ToolIdentifierModal;
