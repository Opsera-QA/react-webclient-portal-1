//PP-97 Deploy Step form for AWS Elastic Beanstalk
//https://opsera.atlassian.net/wiki/spaces/OPSERA/pages/283935120/Code-Deployer

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";


//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  accessKey: "",
  secretKey: "",
  sshKey: "", //file stream to vaule
  userName: "",
  serverIp: "",
  serverPath: "",
  commands: "",
  fileUpload: ""
};


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function SshUploadDeploy( { data, parentCallback }) {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formMessage, setFormMessage] = useState("");


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
  }, []);


  const loadFormData = async (step) => {
    if (typeof(step) !== "undefined") {
      let { configuration } = step;
      if (typeof(configuration) !== "undefined") {
        setFormData(configuration);
      }      
    } else {
      setFormData(INITIAL_DATA);
    }
  };



  const callbackFunction = () => {
    if (validateRequiredFields()) {
    
      //TODO: Node needs to know which fields to post to Vault
      //TODO: Need to wire up streaming the file contents to vault...

      const item = {
        configuration: formData
      };
      parentCallback(item);
    }
  };


  const validateRequiredFields = () => {
    let { accessKey, secretKey, serverIp, serverPath, sshKey } = formData;
    if (accessKey.length === 0 || 
      secretKey.length === 0 || 
      serverIp.length === 0 || 
      serverPath.length === 0 || 
      sshKey.length === 0) {
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
  
  return (
    <Form>
      { formMessage.length > 0 ? <p className="text-danger">{formMessage}</p> : null}

      <Form.Group controlId="accessKey">
        <Form.Label>AWS Account Access Key*</Form.Label>
        <Form.Control maxLength="256" type="text" placeholder="" value={formData.accessKey || ""} onChange={e => setFormData({ ...formData, accessKey: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="secretKey">
        <Form.Label>AWS Access Secret Key*</Form.Label>
        <Form.Control maxLength="256" type="password" placeholder="" value={formData.secretKey || ""} onChange={e => setFormData({ ...formData, secretKey: e.target.value })} />
      </Form.Group>
      
      {/* TODO: Wire this up. */}
      <Form.Group controlId="sshKey">
        <Form.Label>SSH Key File*</Form.Label>
        <Form.File id="sshKeyFile"  />  
        <Form.Text className="text-muted">Attach the PEM/CER key file needed for accessing the EC2 instance</Form.Text>
      </Form.Group>
      <Form.Group controlId="userName">
        <Form.Label>User Name</Form.Label>
        <Form.Control maxLength="150" type="text" placeholder="" value={formData.userName || ""} onChange={e => setFormData({ ...formData, userName: e.target.value })} />
        <Form.Text className="text-muted">Username needed to access the EC2 instance</Form.Text>
      </Form.Group>
      
      <Form.Group controlId="serverIp">
        <Form.Label>Server IP Address</Form.Label>
        <Form.Control maxLength="75" type="text" placeholder="" value={formData.serverIp || ""} onChange={e => setFormData({ ...formData, serverIp: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="serverIp">
        <Form.Label>Server Path</Form.Label>
        <Form.Control maxLength="250" type="text" placeholder="" value={formData.serverIp || ""} onChange={e => setFormData({ ...formData, serverIp: e.target.value })} />
        <Form.Text className="text-muted">Path where the deployment happens</Form.Text>
      </Form.Group>

      <Form.Check 
        type="switch"
        id="ssh-file-upload"
        label="File Upload Method" 
        checked={formData.fileUpload === "SSH File Upload" ? true : false}   
        onChange={() => handleFileUploadToggle(formData.fileUpload)} 
      />

      <Form.Group controlId="commands">
        <Form.Label>SSH Commands*</Form.Label>
        <Form.Control as="textarea" type="text" placeholder="" value={formData.commands || ""} onChange={e => setFormData({ ...formData, commands: e.target.value })} />
      </Form.Group>
      <small className="form-text text-muted mt-2 text-left pb-2">specify SSH commands to run for step</small>

      
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
  parentCallback: PropTypes.func
};

export default SshUploadDeploy;
