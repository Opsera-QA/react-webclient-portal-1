// This is where the custom ToolsConfiguration.configuration form will reside for this tool.
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {Form, Button, Row} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSpinner } from "@fortawesome/free-solid-svg-icons";
import {getFormValidationErrorDialog} from "../../../common/toasts/toasts";


//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  jenkinsUrl: "",
  jenkinsPort: "",
  jUserId: "",
  jAuthToken: ""
};


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function CypressToolConfiguration({ toolData, toolId, fnSaveChanges, fnSaveToVault }) {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState({});

  useEffect(() => {
    if (typeof(toolData) !== "undefined") {
      let { configuration } = toolData;
      if (typeof(configuration) !== "undefined") {
        setFormData(configuration);
      }      
    } else {
      setFormData(INITIAL_DATA);
    }    
  }, [toolData]);


  const callbackFunction = async () => {
    if (validateRequiredFields()) {
      setIsSaving(true);
      let newConfiguration = formData;
      
      if (typeof(newConfiguration.jAuthToken) === "string") {
        newConfiguration.secretKey = await saveToVault(toolId, toolData.tool_identifier, "secretKey", "Vault Secured Key", newConfiguration.jAuthToken);
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
        return { ...formData, jAuthToken: {} };
      });
      return "";
    }
  };

  const validateRequiredFields = () => {
    let { jenkinsUrl, jUserId, jAuthToken } = formData;
    if (jenkinsUrl.length === 0 || jUserId.length === 0 || jAuthToken.length === 0 ) {
      let toast = getFormValidationErrorDialog(setShowToast);
      setToast(toast);
      setShowToast(true);
      return false;
    } else {
      return true;
    }
  };

  // console.log(formData);

  return (
    <Form>
      {showToast && toast}

      <Form.Group controlId="repoField">
        <Form.Label>Jenkins Container URL*</Form.Label>
        <Form.Control maxLength="100" type="text" placeholder="" value={formData.jenkinsUrl || ""} onChange={e => setFormData({ ...formData, jenkinsUrl: e.target.value.trim() })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Jenkins Port</Form.Label>
        <Form.Control maxLength="5" type="text" placeholder="" value={formData.jenkinsPort || ""} onChange={e => setFormData({ ...formData, jenkinsPort: e.target.value.trim() })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Jenkins User ID*</Form.Label>
        <Form.Control maxLength="50" type="text" placeholder="" value={formData.jUserId || ""} onChange={e => setFormData({ ...formData, jUserId: e.target.value.trim() })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Jenkins Token*</Form.Label>
        <Form.Control maxLength="500" type="password" placeholder="" value={formData.jAuthToken || ""} onChange={e => setFormData({ ...formData, jAuthToken: e.target.value.trim() })} />
      </Form.Group>

      {/*TODO: Replace with SaveButton once converted to using data model*/}
      <Row>
        <div className="ml-auto mt-3 px-3">
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
  );
}

CypressToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId:  PropTypes.string,
  fnSaveChanges: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default CypressToolConfiguration;
