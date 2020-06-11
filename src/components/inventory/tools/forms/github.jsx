// This is where the custom ToolsConfiguration.configuration form will reside for this tool.
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSpinner } from "@fortawesome/free-solid-svg-icons";


//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  accountUsername: "",
  accountPassword: ""
};


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function GithubToolConfiguration({ toolData, toolId, fnSaveChanges, fnSaveToVault }) {
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
      
      if (typeof(newConfiguration.accountPassword) === "string") {
        newConfiguration.accountPassword = await saveToVault(toolId, toolData.tool_identifier, "accountPassword", "Vault Secured Key", newConfiguration.accountPassword);
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
        return { ...formData, password: {} };
      });      
      setFormMessage("ERROR: Something has gone wrong saving secure data to your vault.  Please try again or report the issue to OpsERA.");
      return "";
    }
  };

  const validateRequiredFields = () => {
    let { accountUsername, accountPassword } = formData;
    if (accountPassword.length === 0 || accountUsername.length === 0 ) {
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

      <Form.Group controlId="userName">
        <Form.Label>Username*</Form.Label>
        <Form.Control maxLength="100" type="text" placeholder="" value={formData.accountUsername || ""} onChange={e => setFormData({ ...formData, accountUsername: e.target.value })} />
      </Form.Group>
      
      <Form.Group controlId="password">
        <Form.Label>Password*</Form.Label>
        <Form.Control maxLength="256" type="password" placeholder="" value={formData.accountPassword || ""} onChange={e => setFormData({ ...formData, accountPassword: e.target.value })} />            
        <Form.Text className="text-muted">These credentials will be securely stored in vault.</Form.Text> 
      </Form.Group>

      <Button variant="primary" type="button" disabled={isSaving}
        onClick={() => { callbackFunction(); }}> 
        {isSaving ? <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> : <FontAwesomeIcon icon={faSave} className="mr-1"/>} Save
      </Button>
      
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}

GithubToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId:  PropTypes.string,
  fnSaveChanges: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default GithubToolConfiguration;