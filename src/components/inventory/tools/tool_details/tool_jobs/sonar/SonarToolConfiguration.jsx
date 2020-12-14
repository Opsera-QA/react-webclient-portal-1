import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {Form, Button, Row} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSpinner } from "@fortawesome/free-solid-svg-icons";
import {getFormValidationErrorDialog} from "../../../../../common/toasts/toasts";
import TestToolConnectionButton from "../../../../../common/buttons/connection/TestToolConnectionButton";


//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  sonarUrl: "",
  sonarPort : "",
  sonarUserId : "",
  sonarAuthToken : "",
};


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function SonarToolConfiguration( { toolData, toolId, fnSaveChanges, fnSaveToVault }) {
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
      
      if (typeof(newConfiguration.sonarAuthToken) === "string") {
        newConfiguration.sonarAuthToken = await saveToVault(toolId, toolData.tool_identifier, "sonarAuthToken", "Vault Secured Key", newConfiguration.sonarAuthToken);
      }

      const item = {
        configuration: newConfiguration
      };
      console.log("item: ", item);
      await fnSaveChanges(item); 
      setIsSaving(false);
    }
  };

  const saveToVault = async (toolId, toolIdentifier, key, name, value) => {
    //const keyName = `${pipelineId}-${stepId}-${key}`;  //old keyname with pipelineID
    // const keyName = `${toolId}-${toolIdentifier}-${key}`; 
    const keyName = `${toolId}-${toolIdentifier}`; 
    const body = {
      "key": keyName,
      "value": value
    };
    const response = await fnSaveToVault(body);    
    if (response.status === 200 ) {
      return { name: name, vaultKey: keyName };
    } else {
      setFormData(formData => {
        return { ...formData, sonarAuthToken: {} };
      });
      return "";
    }
  };

  const validateRequiredFields = () => {
    let { sonarUrl, sonarPort, sonarUserId, sonarAuthToken } = formData;
    if ( sonarUrl.length === 0 || sonarUserId.length === 0 || sonarAuthToken.length === 0 ) {
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
        <div className="ml-auto"><TestToolConnectionButton recordData={toolData} toolName={"Sonarqube"} disable={isNew}/></div>
      </Row>
      <Form>
        {showToast && toast}


        <Form.Group controlId="sonarUrl">
          <Form.Label>Sonar Url*</Form.Label>
          <Form.Control maxLength="100" type="text" placeholder="" value={formData.sonarUrl || ""} onChange={e => setFormData({ ...formData, sonarUrl: e.target.value.trim() })} />
        </Form.Group>
        <Form.Group controlId="sonarPort">
          <Form.Label>Sonar Port</Form.Label>
          <Form.Control  maxLength="5" type="text" placeholder="" value={formData.sonarPort || ""} onChange={e => setFormData({ ...formData, sonarPort: e.target.value.trim() })} />
        </Form.Group>
        <Form.Group controlId="sonarUserId">
          <Form.Label>Sonar UserId*</Form.Label>
          <Form.Control  maxLength="50" type="text" placeholder="" value={formData.sonarUserId || ""} onChange={e => setFormData({ ...formData, sonarUserId: e.target.value.trim() })} />
        </Form.Group>
        <Form.Group controlId="sonarAuthToken">
          <Form.Label>Sonar Auth Token*</Form.Label>
          <Form.Control maxLength="500" type="password" placeholder="" value={formData.sonarAuthToken || ""} onChange={e => setFormData({ ...formData, sonarAuthToken: e.target.value.trim() })} />
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

SonarToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId:  PropTypes.string,
  fnSaveChanges: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default SonarToolConfiguration;