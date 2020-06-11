// This is where the custom ToolsConfiguration.configuration form will reside for this tool.
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSpinner } from "@fortawesome/free-solid-svg-icons";


//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  jenkinsUrl: "",
  jenkinsPort: "",
  jUserId: "",
  jAuthToken: "",
  jobName: "",
  accessKey: "", 
  secretKey: "", // store in vault
  regions: "",
  bucketName: "",
  s3Url: ""
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
      
      if (typeof(newConfiguration.secretKey) === "string") {
        newConfiguration.secretKey = await saveToVault(toolId, toolData.tool_identifier, "secretKey", "Vault Secured Key", newConfiguration.secretKey);
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
    const body = {
      "key": keyName,
      "value": value
    };
    const response = await fnSaveToVault(body);    
    if (response.status === 200 ) {
      return { name: name, vaultKey: keyName };
    } else {
      setFormData(formData => {
        return { ...formData, secretKey: {} };
      });      
      setFormMessage("ERROR: Something has gone wrong saving secure data to your vault.  Please try again or report the issue to OpsERA.");
      return "";
    }
  };

  const validateRequiredFields = () => {
    let { jenkinsUrl, jUserId, jAuthToken, accessKey, secretKey, regions, bucketName } = formData;
    if (jenkinsUrl.length === 0 || jUserId.length === 0 || jAuthToken.length === 0 ||
      accessKey.length === 0 ||
      secretKey.length === 0 ||
      regions.length === 0 ||
      bucketName.length === 0  ) {
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
      <Form.Group controlId="branchField">
        <Form.Label>Jenkins Token*</Form.Label>
        <Form.Control maxLength="500" type="password" placeholder="" value={formData.jAuthToken || ""} onChange={e => setFormData({ ...formData, jAuthToken: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Job Name</Form.Label>
        <Form.Control maxLength="150" type="text" placeholder="" value={formData.jobName || ""} onChange={e => setFormData({ ...formData, jobName: e.target.value })} />
      </Form.Group>

      {/* Leave the threshold form group as is for now, just read only for all forms */}
      {/* <Form.Group controlId="threshold">
        <Form.Label>Step Success Threshold</Form.Label>
        <Form.Control type="text" placeholder="" value={thresholdVal || ""} onChange={e => setThresholdValue(e.target.value)} disabled={true} />
      </Form.Group> */}

      <Form.Group controlId="accessKey">
        <Form.Label>AWS Access Key ID*</Form.Label>
        <Form.Control maxLength="256" type="text" placeholder="" value={formData.accessKey || ""} onChange={e => setFormData({ ...formData, accessKey: e.target.value })} />
      </Form.Group>
     
      <Form.Group controlId="accessKey">
        <Form.Label>AWS Secret Access Key*</Form.Label>
        <Form.Control maxLength="256" type="password" placeholder="" value={formData.secretKey || ""} onChange={e => setFormData({ ...formData, secretKey: e.target.value })} />            
        <Form.Text className="text-muted">AWS access keys consist of two parts: an access key ID and a secret access key. Both are required for automated deployments.</Form.Text> 
      </Form.Group>

      <Form.Group controlId="bucketRegion">
        <Form.Label>S3 bucket Region*</Form.Label>
        <Form.Control maxLength="150" type="text" placeholder="" value={formData.regions || ""} onChange={e => setFormData({ ...formData, regions: e.target.value })} />
      </Form.Group>

      <Form.Group controlId="bucketName">
        <Form.Label>Bucket Name*</Form.Label>
        <Form.Control maxLength="150" type="text" placeholder="" value={formData.bucketName || ""} onChange={e => setFormData({ ...formData, bucketName: e.target.value })} />
      </Form.Group>
      
      {/* ssh upload response url */}       
      <Form.Group controlId="fileURL">
        <Form.Label>Last Uploaded Package</Form.Label>
        <Form.Control maxLength="350" type="text" disabled placeholder="" value={formData.s3Url || ""} onChange={e => setFormData({ ...formData, s3Url: e.target.value })} />
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