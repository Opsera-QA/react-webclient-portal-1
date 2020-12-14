// This is where the custom ToolsConfiguration.configuration form will reside for this tool.
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {Form, Button, Row} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSpinner } from "@fortawesome/free-solid-svg-icons";
import {getFormValidationErrorDialog} from "../../../common/toasts/toasts";
import TestToolConnectionButton from "../../../common/buttons/connection/TestToolConnectionButton";


//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  toolURL: "",
};


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function SpinnakerToolConfiguration({ toolData, toolId, fnSaveChanges, fnSaveToVault }) {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState({});
  // TODO: Remove when wiring up DTO fields
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    if (typeof(toolData) !== "undefined") {
      let { configuration } = toolData;
      if (typeof(configuration) !== "undefined") {
        setFormData(configuration);
        setIsNew(false);
      }      
    } else {
      setFormData(INITIAL_DATA);
    }    
  }, [toolData]);


  const callbackFunction = async () => {
    if (validateRequiredFields()) {
      setIsSaving(true);
      let newConfiguration = formData;
      
      const item = {
        configuration: newConfiguration
      };
      console.log("item: ", item);
      await fnSaveChanges(item); 
      setIsSaving(false);
    }
  };

  const validateRequiredFields = () => {
    let { toolURL } = formData;
    if (toolURL.length === 0 ) {
      let toast = getFormValidationErrorDialog(setShowToast);
      setToast(toast);
      setShowToast(true);
      return false;
    } else {
      return true;
    }
  };

  return (
    <div>
      <Row>
        <div className="ml-auto"><TestToolConnectionButton recordData={toolData} toolName={"Spinnaker"} disable={isNew}/></div>
      </Row>
      <Form>
        {showToast && toast}

        <Form.Group controlId="toolURL">
          <Form.Label>Spinnaker URL*</Form.Label>
          <Form.Control maxLength="100" type="text" placeholder="" value={formData.toolURL || ""} onChange={e => setFormData({ ...formData, toolURL: e.target.value.trim() })} />
        </Form.Group>

        {/*TODO: Replace with SaveButton once converted to using data model*/}
        <Row>
          <div className="ml-auto mt-3 px-3 d-flex">
            <div className="d-flex">
              {isSaving &&
              <div className="text-center mr-3 mt-1"><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>Saving is in progress</div>}
              <Button size="sm" variant="primary" disabled={isSaving} onClick={() => callbackFunction()}><FontAwesomeIcon
                icon={faSave} fixedWidth className="mr-2"/>Save</Button>
            </div>
          </div>
        </Row>

        <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
      </Form>
    </div>
  );
}

SpinnakerToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId:  PropTypes.string,
  fnSaveChanges: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default SpinnakerToolConfiguration;