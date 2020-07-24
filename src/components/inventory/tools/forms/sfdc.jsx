// This is where the custom ToolsConfiguration.configuration form will reside for this tool.

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSpinner } from "@fortawesome/free-solid-svg-icons";


//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
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
  const [formMessage, setFormMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

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
      
      setFormMessage("ERROR: Something has gone wrong saving secure data to your vault.  Please try again or report the issue to OpsERA.");
      return "";
    }
  };

  const validateRequiredFields = () => {
    let {  accountUsername, sfdc_client_id, sfdc_client_secret, sfdc_token, sfdc_password } = formData;
    if ( accountUsername.length === 0 ||
      sfdc_client_id.length === 0 ||
      sfdc_client_secret.length === 0 ||
      sfdc_token.length === 0 ||
      sfdc_password.length === 0 ) {
      setFormMessage("Required Fields Missing!");
      return false;
    } else {
      setFormMessage("");
      return true;
    }
  };

  return (
    <Form>
      { formMessage.length > 0 ? <p className="error-text">{formMessage}</p> : null}

      
      <Form.Group controlId="accessKey">
        <Form.Label>SFDC Username*</Form.Label>
        <Form.Control maxLength="256" type="text" placeholder="" value={formData.accountUsername || ""} onChange={e => setFormData({ ...formData, accountUsername: e.target.value })} />
      </Form.Group>
     
      <Form.Group controlId="accessKey">
        <Form.Label>SFDC Client Id*</Form.Label>
        <Form.Control maxLength="256" type="password" placeholder="" value={formData.sfdc_client_id || ""} onChange={e => setFormData({ ...formData, sfdc_client_id: e.target.value })} />            
      </Form.Group>

      <Form.Group controlId="awsRegion">
        <Form.Label>SFDC Client Secret*</Form.Label>
        <Form.Control maxLength="256" type="password" placeholder="" value={formData.sfdc_client_secret || ""} onChange={e => setFormData({ ...formData, sfdc_client_secret: e.target.value })} />
      </Form.Group>

      <Form.Group controlId="awsRegion">
        <Form.Label>SFDC Token*</Form.Label>
        <Form.Control maxLength="256" type="password" placeholder="" value={formData.sfdc_token || ""} onChange={e => setFormData({ ...formData, sfdc_token: e.target.value })} />
      </Form.Group>

      <Form.Group controlId="awsAccountId">
        <Form.Label>Password*</Form.Label>
        <Form.Control maxLength="256" type="password" placeholder="" value={formData.sfdc_password || ""} onChange={e => setFormData({ ...formData, sfdc_password: e.target.value })} />
      </Form.Group>
             
      <Button variant="primary" type="button" disabled={isSaving}
        onClick={() => { callbackFunction(); }}> 
        {isSaving ? <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> : <FontAwesomeIcon icon={faSave} className="mr-1"/>} Save
      </Button>
      
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}

SFDCToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId:  PropTypes.string,
  fnSaveChanges: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default SFDCToolConfiguration;