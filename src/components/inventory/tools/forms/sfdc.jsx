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
  toolURL: "https://login.salesforce.com",
  accountUsername : "",
  sfdc_client_id: "", 
  sfdc_client_secret: "",
  sfdc_token: "",
  sfdc_password: "",
};


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function SFDCToolConfiguration( { toolData, toolId, fnSaveChanges, fnSaveToVault }) {
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
      if (typeof(newConfiguration.sfdc_client_id) === "string") {
        // toolId, toolIdentifier, key, name, value
        newConfiguration.sfdc_client_id = await saveToVault(toolId, "sfdc", "client_id", "Vault SFDC client Id", newConfiguration.sfdc_client_id);
      }
      
      if (typeof(newConfiguration.sfdc_client_secret) === "string") {
        // toolId, toolIdentifier, key, name, value
        newConfiguration.sfdc_client_secret = await saveToVault(toolId,  "sfdc", "client_secret", "Vault Client Secret", newConfiguration.sfdc_client_secret);
      }
      
      if (typeof(newConfiguration.sfdc_password) === "string") {
        // toolId, toolIdentifier, key, name, value
        newConfiguration.sfdc_password = await saveToVault(toolId, "sfdc", "password", "Vault SFDC password", newConfiguration.sfdc_password);
      }

      if (typeof(newConfiguration.sfdc_token) === "string") {
        // toolId, toolIdentifier, key, name, value
        newConfiguration.sfdc_token = await saveToVault(toolId, "sfdc", "token", "Vault SFDC token", newConfiguration.sfdc_token);
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
    const keyName = `${toolId}-${toolIdentifier}-${key}`;
    // const keyName = `${toolId}-${toolIdentifier}`; 
    const body = {
      "key": keyName,
      "value": value
    };
    const response = await fnSaveToVault(body);    
    if (response.status === 200 ) {
      return { name: name, vaultKey: keyName };
    } else {
      if(key === "client_id") {
        setFormData(formData => {
          return { ...formData, sfdc_client_id: {} };
        });  
      }
      if(key === "client_secret") {
        setFormData(formData => {
          return { ...formData, sfdc_client_secret: {} };
        });  
      }
      if(key === "password") {
        setFormData(formData => {
          return { ...formData,  sfdc_password: {} };
        });  
      } 

      if(key === "token") {
        setFormData(formData => {
          return { ...formData,  sfdc_token: {} };
        });  
      }

      return "";
    }
  };

  const validateRequiredFields = () => {
    let {  toolURL, accountUsername, sfdc_client_id, sfdc_client_secret, sfdc_token, sfdc_password } = formData;
    if ( toolURL.length === 0 || accountUsername.length === 0 ||
      sfdc_client_id.length === 0 ||
      sfdc_client_secret.length === 0 ||
      sfdc_token.length === 0 ||
      sfdc_password.length === 0 ) {
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
        <div className="ml-auto"><TestToolConnectionButton recordData={toolData} toolName={"Sfdc"} disable={isNew}/></div>
      </Row>
      <Form>
        {showToast && toast}

        <Form.Group controlId="repoField">
          <Form.Label>Domain URL*</Form.Label>
          <Form.Control maxLength="100" type="text" placeholder="" value={formData.toolURL || ""} onChange={e => setFormData({ ...formData, toolURL: e.target.value.trim() })} />
        </Form.Group>

        <Form.Group controlId="accessKey">
          <Form.Label>SFDC Username*</Form.Label>
          <Form.Control maxLength="256" type="text" placeholder="" value={formData.accountUsername || ""} onChange={e => setFormData({ ...formData, accountUsername: e.target.value.trim() })} />
        </Form.Group>

        <Form.Group controlId="accessKey">
          <Form.Label>SFDC Client Id*</Form.Label>
          <Form.Control maxLength="256" type="password" placeholder="" value={formData.sfdc_client_id || ""} onChange={e => setFormData({ ...formData, sfdc_client_id: e.target.value.trim() })} />
        </Form.Group>

        <Form.Group controlId="awsRegion">
          <Form.Label>SFDC Client Secret*</Form.Label>
          <Form.Control maxLength="256" type="password" placeholder="" value={formData.sfdc_client_secret || ""} onChange={e => setFormData({ ...formData, sfdc_client_secret: e.target.value.trim() })} />
        </Form.Group>

        <Form.Group controlId="awsRegion">
          <Form.Label>SFDC Token*</Form.Label>
          <Form.Control maxLength="256" type="password" placeholder="" value={formData.sfdc_token || ""} onChange={e => setFormData({ ...formData, sfdc_token: e.target.value.trim() })} />
        </Form.Group>

        <Form.Group controlId="awsAccountId">
          <Form.Label>Password*</Form.Label>
          <Form.Control maxLength="256" type="password" placeholder="" value={formData.sfdc_password || ""} onChange={e => setFormData({ ...formData, sfdc_password: e.target.value.trim() })} />
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

SFDCToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId:  PropTypes.string,
  fnSaveChanges: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default SFDCToolConfiguration;