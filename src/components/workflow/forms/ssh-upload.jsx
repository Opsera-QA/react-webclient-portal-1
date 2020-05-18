//PP-97 Deploy Step form for AWS Elastic Beanstalk
//https://opsera.atlassian.net/wiki/spaces/OPSERA/pages/283935120/Code-Deployer

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  accessKey: "",
  secretKey: "",
  sshKey: {}, //file stream to vaule
  userName: "",
  serverIp: "",
  serverPath: "",
  commands: "",
  fileUpload: ""
};

const INITIAL_SSH_KEYFILE = {
  fileName: "",
  vaultKey: "" //pipelineId-stepId-sshKey
};

const INITIAL_SECRET_KEY = {
  fileName: "",
  vaultKey: "" //pipelineId-stepId-secretKey
};


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function SshUploadDeploy( { data, pipelineId, stepId, parentCallback, callbackSaveToVault }) {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formMessage, setFormMessage] = useState("");
  const [sshFileMessage, setSshFileMessage] = useState("");
  const [secretKeyMessage, setSecretKeyMessage] = useState("");
  const [sshKeyFile, setSshKeyFile] = useState(INITIAL_SSH_KEYFILE);
  const [secretKey, setSecretKey] = useState(INITIAL_SECRET_KEY);


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
    console.log("Config: ", configuration);
    if (typeof(configuration) !== "undefined") {
      setFormData(configuration);
      setSshKeyFile(configuration.sshKey);
    } else {
      setFormData(INITIAL_DATA);
    }
  };

  const callbackFunction = () => {
    if (validateRequiredFields()) {
      const item = {
        configuration: formData
      };
      console.log("item: ", item);
      parentCallback(item);
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
      setFormData({ ...formData, fileUpload: "" });
    } else {
      setFormData({ ...formData, fileUpload: "SSH File Upload" });
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
        setSshKeyFile({ fileName: "", vaultKey: "" });
        setFormData(formData => {
          return { ...formData, sshKey: {} };
        });
        setSshFileMessage("Warning, file contents too large for this system.  Please ensure the proper file has been selected or contact OpsERA to report this issue.");
      }
    };
    reader.readAsText(e.target.files[0]);
  };

  const saveToVault = async (pipelineId, stepId, key, value) => {
    const keyName = `${pipelineId}-${stepId}-${key}`;
    const body = {
      "key": keyName,
      "value": value
    };
    const response = await callbackSaveToVault(body);    
    return response.status === 200;
  };

  const handleSaveSecretKey = async (value) => {
    setSecretKeyMessage("");
    const vaultResponse = await saveToVault(pipelineId, stepId, "secretKey", value);
    if (vaultResponse) {
      // set validation on the form to green
    } else {
      setSecretKeyMessage("ERROR: Something has gone wrong saving secure data to your vault.  Please try again or report the issue to OpsERA.");
    }  
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
        <InputGroup>
          <Form.Control
            placeholder=""
            disabled={false}
            maxLength="256" type="password" value={formData.secretKey || ""} onChange={e => setFormData({ ...formData, secretKey: e.target.value })}
          />
          <InputGroup.Append>
            <Button variant="outline-secondary"><FontAwesomeIcon icon={faLock} fixedWidth /></Button>
          </InputGroup.Append>
        </InputGroup>
        { secretKeyMessage ?
          <Form.Text className="red">{secretKeyMessage}</Form.Text> :
          <Form.Text className="text-muted">AWS access keys consist of two parts: an access key ID and a secret access key. Both are required for automated deployments.</Form.Text> }
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
          checked={formData.fileUpload === "SSH File Upload" ? true : false}   
          onChange={() => handleFileUploadToggle(formData.fileUpload)} 
        />
      </Form.Group>

      <Form.Group controlId="commands">
        <Form.Label>SSH Commands</Form.Label>
        <Form.Control as="textarea" type="text" placeholder="" value={formData.commands || ""} onChange={e => setFormData({ ...formData, commands: e.target.value })} />
        <Form.Text className="text-muted">SSH commands necessary for this step to complete.</Form.Text>
      </Form.Group>
      
      
      <Button variant="primary" type="button" 
        onClick={() => { callbackFunction(); }}> 
        <FontAwesomeIcon icon={faSave} className="mr-1"/> Save
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
