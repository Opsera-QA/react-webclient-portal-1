//PP-95 Deploy Step form for AWS Elastic Beanstalk
//https://opsera.atlassian.net/wiki/spaces/OPSERA/pages/283935120/Code-Deployer

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSpinner } from "@fortawesome/free-solid-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";

const PLATFORM_OPTIONS = [
  { value: "", label: "Select One", isDisabled: "yes" },
  { value: ".NET on Windows Server", label: ".NET on Windows Server" },
  { value: "Go", label: "Go" },
  { value: "Java SE", label: "Java SE" },
  { value: "Multicontainer Docker", label: "Multiple Container Docker" },
  { value: "Node.js", label: "Node.js" },
  { value: "PHP", label: "PHP" },
  { value: "Preconfigured Docker", label: "Pre-configured Docker" },
  { value: "Python", label: "Python" },
  { value: "Ruby", label: "Ruby" },
  { value: "Single Container Docker", label: "Single Container Docker" },
  { value: "Tomcat", label: "Tomcat" }
];

//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  accessKey: "",
  secretKey: "",
  bucketName: "",
  regions: "",
  applicationName: "",
  applicationVersionLabel: "",
  description: "",
  port: "",
  ec2KeyName: "",
  platform: ""
};


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function ElasticBeanstalkDeploy( { data, pipelineId, stepId, parentCallback, callbackSaveToVault }) {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formMessage, setFormMessage] = useState("");
  const [renderForm, setRenderForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await loadFormData(data);        
        setRenderForm(true);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled via controller.abort");
          return;
        }        
      }
    };
    runEffect();
    return () => {
      setRenderForm(false);     
      controller.abort();      
    };
  }, [data]);


  const loadFormData = async (step) => {
    let { configuration } = step;
    if (typeof(configuration) !== "undefined") {
      setFormData(configuration);
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
        configuration: formData
      };
      console.log("item: ", item);
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
    let { accessKey, secretKey, regions, bucketName, port, ec2KeyName } = formData;
    if (
      accessKey.length === 0 || 
      secretKey.length === 0 || 
      regions.length === 0 || 
      port.length === 0 || 
      ec2KeyName.length === 0 || 
      bucketName.length === 0) {
      setFormMessage("Required Fields Missing!");
      return false;
    } else {
      setFormMessage("");
      return true;
    }
  };

  const handlePlatformChange = (selectedOption) => {
    setFormData({ ...formData, platform: selectedOption.value });    
  };
  
  return (
    <Form>
      { formMessage.length > 0 ? <p className="text-danger">{formMessage}</p> : null}

      <Form.Group controlId="accessKey">
        <Form.Label>AWS Access Key ID*</Form.Label>
        <Form.Control maxLength="256" type="text" placeholder="" value={formData.accessKey || ""} onChange={e => setFormData({ ...formData, accessKey: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="secretKey">
        <Form.Label>AWS Secret Access Key*</Form.Label>
        <Form.Control maxLength="256" type="password" placeholder="" value={formData.secretKey || ""} onChange={e => setFormData({ ...formData, secretKey: e.target.value })} />
        <Form.Text className="text-muted">AWS access keys consist of two parts: an access key ID and a secret access key. Both are required for automated deployments.</Form.Text> 
      </Form.Group>
      <Form.Group controlId="bucketName">
        <Form.Label>S3 Bucket Name*</Form.Label>
        <Form.Control maxLength="150" type="text" placeholder="" value={formData.bucketName || ""} onChange={e => setFormData({ ...formData, bucketName: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="regions">
        <Form.Label>Region*</Form.Label>
        <Form.Control maxLength="25" type="text" placeholder="" value={formData.regions || ""} onChange={e => setFormData({ ...formData, regions: e.target.value })} />
        <Form.Text className="text-muted">Region where the S3 bucket resides.</Form.Text> 
      </Form.Group>

      <Form.Group controlId="ec2KeyName">
        <Form.Label>EC2 Key Name*</Form.Label>
        <Form.Control maxLength="50" type="text" placeholder="" value={formData.ec2KeyName || ""} onChange={e => setFormData({ ...formData, ec2KeyName: e.target.value })} />
        <Form.Text className="text-muted">Key-pair file name used to access the EC2 instance.</Form.Text>
      </Form.Group>

      <Form.Group controlId="port">
        <Form.Label>Application Port*</Form.Label>
        <Form.Control maxLength="10" type="text" placeholder="" value={formData.port || ""} onChange={e => setFormData({ ...formData, port: e.target.value })} />
        <Form.Text className="text-muted">Port that the application needs in order to run.</Form.Text>
      </Form.Group>

      <Form.Group controlId="platform">
        <Form.Label>Platform*</Form.Label>
        {renderForm ?
          <DropdownList
            data={PLATFORM_OPTIONS}
            valueField='id'
            textField='label'
            defaultValue={formData.platform ? PLATFORM_OPTIONS[PLATFORM_OPTIONS.findIndex(x => x.value === formData.platform)] : PLATFORM_OPTIONS[0]}
            onChange={handlePlatformChange}             
          /> : null }
      </Form.Group>


      <Form.Group controlId="applicationName">
        <Form.Label>Application Name</Form.Label>
        <Form.Control maxLength="250" type="text" placeholder="" value={formData.applicationName || ""} onChange={e => setFormData({ ...formData, applicationName: e.target.value })} />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control maxLength="250" type="text" placeholder="" value={formData.description || ""} onChange={e => setFormData({ ...formData, description: e.target.value })} />
      </Form.Group>

      <Form.Group controlId="applicationVersionLabel">
        <Form.Label>Application Version</Form.Label>
        <Form.Control maxLength="50" type="text" placeholder="" value={formData.applicationVersionLabel || ""} onChange={e => setFormData({ ...formData, applicationVersionLabel: e.target.value })} />
      </Form.Group>

      {/* Leave the threshold form group as is for now, just read only for all forms */}
      {/* <Form.Group controlId="threshold">
        <Form.Label>Step Success Threshold</Form.Label>
        <Form.Control type="text" placeholder="" value={thresholdVal || ""} onChange={e => setThresholdValue(e.target.value)} disabled={true} />
      </Form.Group> */}
      
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

ElasticBeanstalkDeploy.propTypes = {
  data: PropTypes.object,
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func
};

export default ElasticBeanstalkDeploy;
