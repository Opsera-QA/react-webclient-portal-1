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
  accountUsername: "",
  accountPassword: "",
  secretPrivateKey: "",
  secretAccessTokenKey: "",
  twoFactorAuthentication: false
};


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function GithubToolConfiguration({ toolData, toolId, fnSaveChanges, fnSaveToVault }) {
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
     
      if (typeof(newConfiguration.accountPassword) === "string") {
        newConfiguration.accountPassword = await saveToVault(toolId, toolData.tool_identifier, "", "Vault Secured Key", newConfiguration.accountPassword);
      }  
      if (typeof(newConfiguration.secretPrivateKey) === "string") {
        newConfiguration.secretPrivateKey = await saveToVault(toolId, toolData.tool_identifier, "secretPrivateKey", "Vault Secured Key", newConfiguration.secretPrivateKey);
      }
      if (typeof(newConfiguration.secretAccessTokenKey) === "string") {
        newConfiguration.secretAccessTokenKey = await saveToVault(toolId, toolData.tool_identifier, "secretAccessTokenKey", "Vault Secured Key", newConfiguration.secretAccessTokenKey);
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
    let keyName = "";
    if(key && key.length > 0) {
      keyName = `${toolId}-${toolIdentifier}-${key}`;
    } else {
      keyName = `${toolId}-${toolIdentifier}`;
    }
    const body = {
      "key": keyName,
      "value": value
    };
    const response = await fnSaveToVault(body);    
    if (response.status === 200 ) {
      return { name: name, vaultKey: keyName };
    } else {
      if( key.length > 0 ) {
        setFormData(formData => {
          return { ...formData, key: {} };
        }); 
      } else {
        setFormData(formData => {
          return { ...formData, accountPassword: {} };
        }); 
      }        
      return "";
    }
  };

  const validateRequiredFields = () => {
    let { accountUsername, accountPassword, secretPrivateKey, secretAccessTokenKey, twoFactorAuthentication } = formData;
    if(twoFactorAuthentication) {
      if (secretPrivateKey.length === 0 || secretAccessTokenKey.length === 0 || accountUsername.length === 0  ) {
        let toast = getFormValidationErrorDialog(setShowToast);
        setToast(toast);
        setShowToast(true);
        return false;
      } else {
        return true;
      }
    } else {
      if (accountPassword.length === 0 || accountUsername.length === 0  ) {
        let toast = getFormValidationErrorDialog(setShowToast);
        setToast(toast);
        setShowToast(true);
        return false;
      } else {
        return true;
      }
    }
  };

  return (
    <Form>
      {showToast && toast}

      <Form.Group controlId="userName">
        <Form.Label>Username*</Form.Label>
        <Form.Control maxLength="100" type="text" placeholder="" value={formData.accountUsername || ""} onChange={e => setFormData({ ...formData, accountUsername: e.target.value.trim() })} />
      </Form.Group>
      

      {!formData.twoFactorAuthentication && 
        <Form.Group controlId="password">
          <Form.Label>Password*</Form.Label>
          <Form.Control maxLength="256" type="password" placeholder="" value={formData.accountPassword || ""} onChange={e => setFormData({ ...formData, accountPassword: e.target.value.trim() })} />            
          <Form.Text className="text-muted">These credentials will be securely stored in vault.</Form.Text> 
        </Form.Group>
      }

      <Form.Group controlId="formBasicCheckbox" className="mt-4 ml-1">
        <Form.Check type="checkbox" label="Is two-factor enabled?"
          checked={formData.twoFactorAuthentication } onChange={() => setFormData({
            ...formData,
            twoFactorAuthentication: !formData.twoFactorAuthentication,
            secretPrivateKey: "",
            secretAccessTokenKey: ""
          })}/>
        {/* <Form.Text className="text-muted"></Form.Text>       */}

      </Form.Group>
      {formData.twoFactorAuthentication && 
      <>
        <Form.Group controlId="password">
          <Form.Label>Private Key*</Form.Label>
          <Form.Control as="textarea" type="password"  style={{WebkitTextSecurity: 'disc'}}  placeholder="" value={formData.secretPrivateKey || ""} onChange={e => setFormData({ ...formData, secretPrivateKey: e.target.value.trim() })} />            
          <Form.Text className="text-muted">These credentials will be securely stored in vault.</Form.Text> 
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Access Key*</Form.Label>
          <Form.Control maxLength="256" type="password" placeholder="" value={formData.secretAccessTokenKey || ""} onChange={e => setFormData({ ...formData, secretAccessTokenKey: e.target.value.trim() })} />            
          <Form.Text className="text-muted">These credentials will be securely stored in vault.</Form.Text> 
        </Form.Group>
      </>
      }

      {/*TODO: Replace with SaveButton once converted to using data model*/}
      <Row>
        <div className="ml-auto mt-3 px-3 d-flex">
          <div>
            <TestToolConnectionButton recordData={toolData} toolName={"Github"}/>
          </div>
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

GithubToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId:  PropTypes.string,
  fnSaveChanges: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default GithubToolConfiguration;