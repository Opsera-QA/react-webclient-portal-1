import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSpinner } from "@fortawesome/free-solid-svg-icons";

const INITIAL_DATA = {
  jenkinsUrl: "",
  jenkinsPort: "",
  jUserId: "",
  jAuthToken: "",
  jPassword: "",
  proxyUserName: "",
  proxyPassword: "",
  isProxyEnable: ""
};

function JenkinsToolConfiguration( { toolData, toolId, fnSaveChanges, fnSaveToVault }) {
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
      
      if (typeof(newConfiguration.jAuthToken) === "string") {
        newConfiguration.jAuthToken = await saveToVault(toolId, toolData.tool_identifier, "jAuthToken", "Vault Secured Key", newConfiguration.jAuthToken);
      }
      if (typeof(newConfiguration.jPassword) === "string") {
        newConfiguration.jPassword = await saveToVault(toolId, toolData.tool_identifier, "jPassword", "Vault Secured Key", newConfiguration.jPassword);
      }
      if (typeof(newConfiguration.proxyPassword) === "string") {
        newConfiguration.proxyPassword = await saveToVault(toolId, toolData.tool_identifier, "proxyPassword", "Vault Secured Key", newConfiguration.proxyPassword);
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
      setFormData(formData => {
        return { ...formData, key: {} };
      });      
      setFormMessage("ERROR: Something has gone wrong saving secure data to your vault.  Please try again or report the issue to OpsERA.");
      return "";
    }
  };

  const validateRequiredFields = () => {
    let { jenkinsUrl, jUserId, jAuthToken, isProxyEnable, jPassword, proxyUserName, proxyPassword } = formData;
    if(isProxyEnable) {
      if (jenkinsUrl.length === 0 || jUserId.length === 0 || jPassword.length === 0 || proxyPassword.length === 0 || proxyUserName.length === 0  ) {
        setFormMessage("Required Fields Missing!");
        return false;
      } else {
        setFormMessage("");
        return true;
      }
    } else {
      if (jenkinsUrl.length === 0 || jUserId.length === 0 || jAuthToken.length === 0) {
        setFormMessage("Required Fields Missing!");
        return false;
      } else {
        setFormMessage("");
        return true;
      }
    }
  };

console.log(formData)

  return (
    <Form>
      { formMessage.length > 0 ? <p className="error-text">{formMessage}</p> : null}

      <Form.Group controlId="repoField">
        <Form.Label>Jenkins Container URL*</Form.Label>
        <Form.Control maxLength="100" type="text" placeholder="" value={formData.jenkinsUrl || ""} onChange={e => setFormData({ ...formData, jenkinsUrl: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Jenkins Port</Form.Label>
        <Form.Control maxLength="5" type="text" placeholder="" value={formData.jenkinsPort || ""} onChange={e => setFormData({ ...formData, jenkinsPort: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Jenkins User ID*</Form.Label>
        <Form.Control maxLength="50" type="text" placeholder="" value={formData.jUserId || ""} onChange={e => setFormData({ ...formData, jUserId: e.target.value })} />
      </Form.Group>

      {!formData.isProxyEnable &&
      <Form.Group controlId="branchField">
        <Form.Label>Jenkins Token*</Form.Label>
        <Form.Control maxLength="500" type="password" placeholder="" value={formData.jAuthToken || ""} onChange={e => setFormData({ ...formData, jAuthToken: e.target.value })} />
      </Form.Group>
      }
      
      <Form.Group controlId="formBasicCheckbox" className="ml-1">
        <Form.Check
          type="checkbox"
          label="is proxy enabled?"
          name="isProxyEnable"
          checked={formData.isProxyEnable ? formData.isProxyEnable : false}
          onChange={(e) => 
            setFormData({
              ...formData,
              isProxyEnable: e.target.checked
            })
          }
        />
      </Form.Group>   
      {formData.isProxyEnable && 
      <>
       <Form.Group controlId="branchField">
        <Form.Label>Proxy Username*</Form.Label>
        <Form.Control maxLength="50" type="text" placeholder="" value={formData.proxyUserName || ""} onChange={e => setFormData({ ...formData, proxyUserName: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Proxy Password*</Form.Label>
        <Form.Control maxLength="500" type="password" placeholder="" value={formData.proxyPassword || ""} onChange={e => setFormData({ ...formData, proxyPassword: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Jenkins Password*</Form.Label>
        <Form.Control maxLength="500" type="password" placeholder="" value={formData.jPassword || ""} onChange={e => setFormData({ ...formData, jPassword: e.target.value })} />
      </Form.Group>
      </>
      }               
     
            
      <Button variant="primary" type="button" disabled={isSaving}
        onClick={() => { callbackFunction(); }}> 
        {isSaving ? <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> : <FontAwesomeIcon icon={faSave} className="mr-1"/>} Save
      </Button>
      
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}

JenkinsToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId:  PropTypes.string,
  fnSaveChanges: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default JenkinsToolConfiguration;