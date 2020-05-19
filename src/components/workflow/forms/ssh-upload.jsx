//PP-97 Deploy Step form for AWS Elastic Beanstalk
//https://opsera.atlassian.net/wiki/spaces/OPSERA/pages/283935120/Code-Deployer

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSpinner } from "@fortawesome/free-solid-svg-icons";

const INITIAL_DATA = {
  accessKey: "",
  secretKey: "",
  sshKey: {}, //file stream to value
  userName: "",
  serverIp: "",
  serverPath: "",
  commands: "",
  sshAction: ""
};

const INITIAL_SSH_KEYFILE = {
  fileName: "",
  vaultKey: "" //pipelineId-stepId-sshKey
};


function SshUploadDeploy( { data, pipelineId, stepId, parentCallback, callbackSaveToVault }) {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formMessage, setFormMessage] = useState("");
  const [sshFileMessage, setSshFileMessage] = useState("");
  const [sshKeyFile, setSshKeyFile] = useState(INITIAL_SSH_KEYFILE);
  const [loading, setLoading] = useState(false);

  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await loadFormData(data);                
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled via controller.abort");
          return;
        }        
      }
    };
    runEffect();
    return () => {     
      controller.abort();      
    };
  }, [data]);

  const loadFormData = async (step) => {    
    let { configuration } = step;
    if (typeof(configuration) !== "undefined") {
      setFormData(configuration);
      setSshKeyFile(configuration.sshKey);
    } else {
      setFormData(INITIAL_DATA);
    }
  };

  const callbackFunction = async () => {
    if (validateRequiredFields()) {
      setLoading(true);
      let newConfiguration = formData;
      
      if (typeof(newConfiguration.secretKey) === "string") {
        newConfiguration.secretKey = await saveToVault(pipelineId, stepId, "secretKey", "Vault Secured Key", newConfiguration.secretKey);
      }
      
      const item = {
        configuration: newConfiguration
      };
      //console.log("item: ", item);
      setLoading(false);
      parentCallback(item);
    }
  };

  const saveToVault = async (pipelineId, stepId, key, name, value) => {
    const keyName = `${pipelineId}-${stepId}-${key}`;
    const body = {
      "key": keyName,
      "value": value
    };
    const response = await callbackSaveToVault(body);    
    if (response.status === 200 ) {
      return { name: name, vaultKey: keyName };
    } else {
      setFormData(formData => {
        return { ...formData, secretKey: {} };
      });
      setLoading(false);
      setFormMessage("ERROR: Something has gone wrong saving secure data to your vault.  Please try again or report the issue to OpsERA.");
      return "";
    }
  };

  const validateRequiredFields = () => {
    let { accessKey, secretKey, sshKey } = formData;
    if (accessKey.length === 0 || 
      secretKey.length === 0 || 
      Object.keys(sshKey).length === 0) {
      setFormMessage("Required Fields Missing!");
      return false;
    } else {
      setFormMessage("");
      return true;
    }
  };

  const handleFileUploadToggle = (value) => {
    if (value === "SSH File Upload") {
      setFormData({ ...formData, sshAction: "" });
    } else {
      setFormData({ ...formData, sshAction: "SSH File Upload" });
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setSshFileMessage("");
    const reader = new FileReader();
    const fileSize = e.target.files[0].size;
    const fileName = e.target.files[0].name;

    reader.onload = async (e) => { 
      const text = (e.target.result);       
      if (fileSize < 3000) {
        const vaultResponse = await saveToVault(pipelineId, stepId, "sshKey", text);
        if (vaultResponse) {
          const keyName = `${pipelineId}-${stepId}-sshKey`;
          setSshKeyFile({ fileName: fileName, vaultKey: keyName });
          setFormData(formData => {
            return { ...formData, sshKey: { fileName: fileName, vaultKey: keyName } };
          });
        } else {
          setSshFileMessage("ERROR: Something has gone wrong saving secure data to your vault.  Please try again or report the issue to OpsERA.");
        }        
      } else {
        setSshKeyFile(INITIAL_SSH_KEYFILE);
        setFormData(formData => {
          return { ...formData, sshKey: {} };
        });
        setSshFileMessage("Warning, file contents too large for this system.  Please ensure the proper file has been selected or contact OpsERA to report this issue.");
      }
    };
    reader.readAsText(e.target.files[0]);
  };



  return (
    <Form>
      { formMessage.length > 0 ? <p className="text-danger">{formMessage}</p> : null}
      
      <Form.Group controlId="accessKey">
        <Form.Label>AWS Access Key ID*</Form.Label>
        <Form.Control maxLength="256" type="text" placeholder="" value={formData.accessKey || ""} onChange={e => setFormData({ ...formData, accessKey: e.target.value })} />
      </Form.Group>
     
      <Form.Group controlId="accessKey">
        <Form.Label>AWS Secret Access Key*</Form.Label>
        <Form.Control maxLength="256" type="password" placeholder="" value={formData.secretKey || ""} onChange={e => setFormData({ ...formData, secretKey: e.target.value })} />            
        <Form.Text className="text-muted">AWS access keys consist of two parts: an access key ID and a secret access key. Both are required for automated deployments.</Form.Text> 
      </Form.Group>

      <Form.Group controlId="accessKey" className="mt-2">
        <Form.Label>Security Key*</Form.Label>
        <Form.File 
          id="sshKey-file" isValid={sshKeyFile.fileName.length > 0 }
          label={sshKeyFile.fileName ? sshKeyFile.fileName : "Upload Key File"}
          custom
          onChange={(e) => handleFileUpload(e)} 
        />
        {sshFileMessage ? 
          <Form.Text className="red">{sshFileMessage}</Form.Text> :
          <Form.Text className="text-muted">Attach the PEM/CER key file needed for accessing the EC2 instance.  This data will be secured in our Vault.</Form.Text> }
      </Form.Group>

      <Form.Group controlId="userName" className="mt-3">
        <Form.Label>User Name</Form.Label>
        <Form.Control maxLength="150" type="text" placeholder="" value={formData.userName || ""} onChange={e => setFormData({ ...formData, userName: e.target.value })} />
        <Form.Text className="text-muted">Username needed to access the EC2 instance.</Form.Text>
      </Form.Group>
      
      <Form.Group controlId="serverIp">
        <Form.Label>Server Address</Form.Label>
        <Form.Control maxLength="75" type="text" placeholder="" value={formData.serverIp || ""} onChange={e => setFormData({ ...formData, serverIp: e.target.value })} />
        <Form.Text className="text-muted">DNS or IP Address for the server.</Form.Text>
      </Form.Group>

      <Form.Group controlId="serverIp">
        <Form.Label>Server Path</Form.Label>
        <Form.Control maxLength="250" type="text" placeholder="" value={formData.serverPath || ""} onChange={e => setFormData({ ...formData, serverPath: e.target.value })} />
        <Form.Text className="text-muted">Path where the deployment occurs in.</Form.Text>
      </Form.Group>

      <Form.Group controlId="ssh-file-upload">
        <Form.Check 
          type="switch"
          id="ssh-file-upload"
          label="Use SSH File Upload Method" 
          checked={formData.sshAction === "SSH File Upload" ? true : false}   
          onChange={() => handleFileUploadToggle(formData.sshAction)} 
        />
      </Form.Group>

      <Form.Group controlId="commands">
        <Form.Label>SSH Commands</Form.Label>
        <Form.Control as="textarea" type="text" rows={6} placeholder="" value={formData.commands || ""} onChange={e => setFormData({ ...formData, commands: e.target.value })} />
        <Form.Text className="text-muted">SSH commands necessary for this step to complete.</Form.Text>
      </Form.Group>
      
      <Button variant="primary" type="button" 
        onClick={() => { callbackFunction(); }}> 
        {loading ? 
          <><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> Saving</> :
          <><FontAwesomeIcon icon={faSave} className="mr-1"/> Save</> }
      </Button>
      
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}

SshUploadDeploy.propTypes = {
  data: PropTypes.object,
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func
};

export default SshUploadDeploy;
